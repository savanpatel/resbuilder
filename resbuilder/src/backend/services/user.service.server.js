/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var auth = authorized;

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post("/api/user", createUser);
    app.post("/api/user/login", passport.authenticate('local'), login);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);
    app.get("/api/user/username/:username", checkUsernameAvailable);


    var UserModel = mongooseAPI.userModelAPI;

    passport.use(new LocalStrategy(localStrategy));

    /*Passport related functions*/

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
    
    /*
     * 
     */
    function localStrategy(username, password, done) {
        if(null == username || null == password ||
            "" == username || "" == password){
            res.sendStatus(500).send("null/empty username or password");
            return;
        }


        UserModel
            .findUserByCredentials(username, password)
            .then(function (user) {

                if(!user) {
                    return done(null, false);
                }

                return done(null, user);


            }, function (err) {
                return done(err);
            });
    }


    function serializeUser(user, done) {
        console.log(user)
        done(null, user);
    }


    function deserializeUser(user, done) {

         UserModel
            .findUserById(user._id)
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    return done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    /*
     *  Handlers
     */

    
    

    /*
     * Handler for POST call /api/user
     */
    function createUser(req, res) {

        var user = req.body;

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
                    res.send(user);
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

}