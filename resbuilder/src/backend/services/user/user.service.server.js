/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI, passport) {

    var LocalStrategy = require('passport-local').Strategy;
    LinkedInStrategy = require('passport-linkedin').Strategy;
    var bcrypt = require("bcrypt-nodejs");


    var auth = authorized;

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    app.post("/api/user", createUser);
    app.post("/api/user/login", passport.authenticate('local'), login);
    app.post("/api/recruiter/login", passport.authenticate('local'), login);
    app.get("/api/user/:userId", auth, findUserById);
    app.delete("/api/user/:userId",auth, deleteUser);
    app.put("/api/user/:userId",auth, updateUser);
    app.get("/api/user/username/:username", checkUsernameAvailable);
    app.get("/api/user/linkedin/callback", passport.authenticate('linkedin', { failureRedirect: '/' }), linkedInSignUp);
    app.get('/api/user/auth/linkedin', passport.authenticate('linkedin'));
    app.get('/api/user/:userId/logout', auth, logout);
    app.put('/api/user/:userId/updatepassword', auth, updateUserPassword);

    var UserModel = mongooseAPI.userModelAPI;
    var WorkExpModel = mongooseAPI.workExpModelAPI;
    var RecruiterModel = mongooseAPI.recruiterModelAPI;

    passport.use(new LocalStrategy({passReqToCallback: true}, localStrategy));

    passport.use(new LinkedInStrategy({
            consumerKey: "86kjumoat02m2u",
            consumerSecret: "69kv8q36g55rwKtg",
            callbackURL: "/api/user/linkedin/callback",
            profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline','positions','specialties'],
        },
        function(token, tokenSecret, profile, done) {
            // asynchronous verification, for effect...

            process.nextTick(function () {
                // To keep the example simple, the user's LinkedIn profile is returned to
                // represent the logged-in user.  In a typical application, you would want
                // to associate the LinkedIn account with a user record in your database,
                // and return that user instead.


                var linkedInUser = profile;
                if(null == linkedInUser){
                    res.redirect("/");
                    return;
                }

                // convert linked in user to user object.
                var user =  {
                    username: linkedInUser._json.id,
                    password: linkedInUser._json.id,
                    firstName: linkedInUser._json.firstName,
                    lastName: linkedInUser._json.lastName,
                    email:linkedInUser._json.emailAddress
                };


                var workExp = null;

                if(linkedInUser._json.positions &&
                    linkedInUser._json.positions._total > 0){

                    var position = linkedInUser._json.positions.values[0];

                    workExp = {
                        userId: user._id,
                        jobTitle: position.title,
                        companyName: position.company.name,
                        description: position.summary,
                        startDate: position.startDate.month + "/" + position.startDate.year,
                        location: position.location.name + ", " + position.location.country.name
                    };
                }


                UserModel.findUserByEmail(user.email)
                    .then(function (dbUser) {

                        // user is not present.
                        if(null == dbUser)
                        {

                            // create user in db.
                            UserModel.createUser(user)
                                .then(function (dbUser2){
                                    if(null == dbUser2)
                                    {
                                        res.sendStatus(500).send("Internal server error.");
                                    }
                                    else
                                    {
                                        if(null != workExp){
                                            // create work exp
                                            WorkExpModel.createWorkExp(workExp, dbUser2._id)
                                                .then(function (dbWorkExp) {
                                                        var retUser = JSON.parse(JSON.stringify(dbUser2));
                                                        retUser['isNew'] = false;
                                                        return done(null, dbUser2);
                                                    },
                                                    function (err) {
                                                        var retUser = JSON.parse(JSON.stringify(dbUser2));
                                                        retUser['isNew'] = false;
                                                        return done(null, dbUser2);
                                                    });
                                        } else {
                                            return done(null, dbUser2);
                                        }

                                    }
                                }, function (err) {
                                    return done(null, false);
                                });
                        }
                        else{
                            var retUser = JSON.parse(JSON.stringify(dbUser));
                            retUser['isNew'] = false;
                            return done(null, dbUser);
                        }

                    }, function (err) {
                        return done(null, false);
                    });
            });
        }
    ));

    /*Passport related functions*/

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }
    
    /*
     * 
     */
    function localStrategy(req, username, password, done) {
        if(null == username || null == password ||
            "" == username || "" == password){
            res.sendStatus(500).send("null/empty username or password");
            return;
        }


        if(req.body.isRecruiter && req.body.isRecruiter == true){
            RecruiterModel
                .findRecruiterByCredentials(username, password)
                .then(function (user) {

                    if(!user) {
                        return done(null, false);
                    } else {
                        return done(null, user);
                    }


                }, function (err) {
                    return done(err);
                });
        }
        else {


            UserModel
                .findUserByCredentials(username, password)
                .then(function (user) {

                    if(!user) {
                        return done(null, false);
                    } else {
                        return done(null, user);
                    }


                }, function (err) {
                    return done(err);
                });
        }

    }


    function serializeUser(user, done) {
        done(null, user);
    }


    function deserializeUser(user, done) {

        if(user.companyname){
            RecruiterModel
                .findRecruiterById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else {
            UserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }

    }



    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    /*
     *  Handlers
     */
    function linkedInSignUp(req, res) {

        if(req.user && req.isAuthenticated()){
            res.redirect("/#/user/" + req.user._id + "/dashboard");
            return;
        }

        res.redirect("/");


    }
    

    /*
     * Handler for POST call /api/user
     */
    function createUser(req, res) {

        var user = req.body;

        user.password = bcrypt.hashSync(user.password);


        if(null == user){
            req.sendStatus(500).send("null/empty user");
            return;
        }

        // if user present then just fetch and return, if not then creat one.
        UserModel.findUserByEmail(user.email)
                .then(function (dbUser) {

                    // user is not present.
                    if(null == dbUser)
                    {

                        // create user in db.
                        UserModel.createUser(user)
                            .then(function (dbUser2){
                                if(null == dbUser2){
                                    res.sendStatus(500).send("Internal server error.");
                                } else {
                                    var retUser = JSON.parse(JSON.stringify(dbUser2));
                                    retUser['isNew'] = true;
                                    res.send(retUser);
                                }
                            }, function (err) {
                                res.sendStatus(500).send(err);
                            });
                    }
                    else{
                        var retUser = JSON.parse(JSON.stringify(dbUser));
                        retUser['isNew'] = false;
                        res.send(retUser);
                    }

                }, function (err) {
                    res.sendStatus(500).send(err);
                });
        }
    
    

    /*
     *
     * Handler for GET call to /api/user
     *
     */
    function findUserByCredentials(req, res) {

        var queryParams = req.query;

        var username = queryParams.username;
        var password = queryParams.password;

        if(null == username || null == password ||
           "" == username || "" == password){
            res.sendStatus(500).send("null/empty username or password");
            return;
        }

        UserModel
            .findUserByCredentials(username, password)
            .then(function (user) {

                if(null == user) {
                    // user not found in db.
                    res.sendStatus(404).send("User not found.");
                } else {
                    res.send(user);
                }

            }, function (err) {
                // error on database side.
                res.sendStatus(404).send(err);
            });
    }



    /*
     *
     * Handler for find user by user id.
     *
     */
    function findUserById(req, res) {

        var userId = req.params.userId;

        if(userId == null){
            res.sendStatus(500).send("null userId.");
            return;
        }

        UserModel.findUserById(userId)
            .then(function (user) {

                if(null == user){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(user);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }




    /*
     *
     * Handler for update user PUT call.
     */
    function updateUser(req, res) {

        var user = req.body;
        var userId = req.params.userId;

        if(null == user){
            res.sendStatus(500).send("null/empty user for update.");
            return;
        }

        UserModel.updateUser(userId, user)
            .then(function (dbUser) {
                if(null == dbUser){
                    res.sendStatus(500).send("Could not update user.");
                } else {
                    res.send(dbUser);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }

    /*
     * Handler for delete user DELETE call.
     */
    function deleteUser(req, res) {

        var userId = req.params.userId;

        if(null == userId){
            res.sendStatus(404);
            return;
        }

        UserModel.deleteUser(userId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }



    /*Handler for GET call to check if username is available*/
    function checkUsernameAvailable(req, res) {

        var username = req.params.username;

        if(null == username || username == ""){
            var response = {
                isAvailable:false
            };

            res.send(response);
            return;
        }



        UserModel.checkUsernameAvailable(username)
            .then(function (user) {
                if(user){
                    res.send({isAvailable:false});
                } else{
                    res.send({isAvailable:true});
                }

            }, function (err) {
                res.send({isAvailable:false})
            });

    }



    function updateUserPassword(req, res) {

        var userId = req.params.userId;
        var userPasswordInfo = req.body;

        if(null == userPasswordInfo || null == userPasswordInfo.oldPassword ||
           null == userPasswordInfo.newPassword){
            res.sendStatus(500).send('Can not update password!');
            return;
        }

        UserModel.updateUserPassword(userId, userPasswordInfo.oldPassword, userPasswordInfo.newPassword)
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    /*end passport session.*/
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

}
