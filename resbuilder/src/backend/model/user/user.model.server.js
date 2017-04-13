/*
 *  User database service.
 *
 */
module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var UserSchema = require('./user.schema.server')(app, mongoose);
    var UserModel = mongoose.model('User', UserSchema);
    var bcrypt = require("bcrypt-nodejs");

    var api = {
        createUser:createUser,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        deleteUser:deleteUser,
        checkUsernameAvailable:checkUsernameAvailable,
        updateUserPassword:updateUserPassword,
        findUserByEmail:findUserByEmail,
        findAllUsers:findAllUsers,
        findBlockedUsers:findBlockedUsers,
        findUnBlockedUsers:findUnBlockedUsers,
        findUsersForIds:findUsersForIds,
        isAdmin: isAdmin,
        getAdminInfo:getAdminInfo,
        updateUserPasswordByAdmin:updateUserPasswordByAdmin
    };

    return api;


    function updateUserPasswordByAdmin(userId,newPassWord) {

        var deferred = q.defer();
        console.log("user")
        console.log(userId)

        newPassWord = bcrypt.hashSync(newPassWord);

        UserModel.findById(userId, function (err, dbUser) {

            if(err){
                logger.error('Unable to find user.' + err);
                deferred.reject(err);
            } else {

                UserModel.update({_id:userId},{$set:{password:newPassWord}}, function (err, dbUser) {
                    if(err) {
                        logger.error("Can not update user with id " + userId  + " Error: " + err);
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve("done");
                    }
                });
            }
        });


        return deferred.promise;

    }

    function isAdmin(userId) {

        var deferred = q.defer();
        UserModel.findById(userId,function (err,user) {
            if(err){
                deferred.abort()
            }
            else {
                if(user.role === "ADMIN"){
                    deferred.resolve(true)
                }
                else {
                    deferred.resolve(false)
                }
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find({},function (err,users) {
            if(err) {
                deferred.abort();
            }
            else{
                deferred.resolve(users)
            }
        });
        return deferred.promise;
    }

    function findBlockedUsers() {
        var deferred = q.defer();
        UserModel.findOne({'is_deleted':true},function (err,users) {

            if(err) {
                deferred.abort();
            }
            else{
                deferred.resolve(users)
            }
        });
        return deferred.promise;
    }

    function findUnBlockedUsers() {
        var deferred = q.defer();
        UserModel.findOne({'is_deleted':false},function (err,users) {

            if(err) {
                deferred.abort();
            }
            else{
                deferred.resolve(users)
            }
        });
        return deferred.promise;
    }

    /*function definitions*/


    /*
     * createUser: Creates a new user in mongo db.
     * params: user object created similar to UserSchema.
     * returns: promise.
     */
    
    function createUser(user) {

        var deferred = q.defer();

        UserModel.create(user, function (err, dbUser) {

            if(err){
                logger.error('Unable to create user.');
                deferred.reject(err);
            } else {
                deferred.resolve(dbUser);
            }

        });

        return deferred.promise;
    }




    /*
     * findUserById : find user by user id.
     * params: userId
     * returns: promise
     */
    function findUserById(userId) {

        var deferred = q.defer();

        UserModel.findById(userId, function (err, dbUser) {

            if(err){
                logger.error('Unable to find user.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbUser);
            }
        });

        return deferred.promise;
    }



    /*
     * findUserByUsername: Finds user by username.
     * params: username
     * returns: promise
     */
    function findUserByUsername(username) {

        var deferred = q.defer();


        UserModel.findOne({username:username}, function (err, dbUser) {

            if(err){
                logger.error("Can not find user by username. " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbUser);
            }
        });


        return deferred.promise;
    }



    /*
     * updateUser: updates the user.
     * params: userId and user object with updated fields.
     * returns: promise.
     */
    /*
     * updateUser: updates the user.
     * params: userId and user object with updated fields.
     * returns: promise.
     */
    function updateUser(userId, user) {

        var deferred = q.defer();

        UserModel.findById(userId, function (err, dbUser) {

            if(err){
                logger.error('Unable to find user.' + err);
                deferred.reject(err);
            } else {
                user.password = dbUser.password;
                UserModel.update({_id:userId},{$set:user}, function (err, dbUser) {
                    if(err) {
                        logger.error("Can not update user with id " + userId  + " Error: " + err);
                        deferred.reject(err);
                    }
                    else {
                        deferred.resolve(user);
                    }
                });
            }
        });


        return deferred.promise;
    }



    /*
     * deleteUser: deletes user from database.
     * params: userId
     * returns: promise
     */
    function deleteUser(userId) {

        var deferred = q.defer();

        UserModel.remove({_id:userId}, function (err) {
            if(err) {
                logger.error("Can not delete user with id " + userId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }




    /*
     * Find user by credentials username and password
     *
     */
    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        UserModel.findOne({username:username}, function (err, user) {

            console.log(user)
            if(user && bcrypt.compareSync(password, user.password)){
                if (!user.is_deleted) {
                    if (err) {
                        logger.error("ERROR: [findUserByCredentials]: " + err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(user);
                    }
                }
                else {
                    deferred.reject("user is blocked");
                }
            }
            else{
                deferred.reject("password is incorrect");
            }
        });


        return deferred.promise;
    }



    function checkUsernameAvailable(username) {
        var deferred = q.defer();

        UserModel.findOne({username:username}, function (err, user) {

            if(err){
                logger.error("ERROR: [checkUsernameAvailable]: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    
    function findUserByEmail(email) {
        var deferred = q.defer();

        UserModel.findOne({email:email}, function (err, user) {

            if(err){
                logger.error("ERROR: [findUserByEmail]: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });


        return deferred.promise;
    }




    /*
     *
     *
     */
    function findUsersForIds(userIdList) {

        var deferred = q.defer();
        UserModel.find({$and: [{_id:{$in: userIdList}}, {isPublic:true}]}, function (err, users) {

            if(err){
                logger.error("Error: Can not find users from list. " + err);
                deferred.reject(err);
            } else{

                deferred.resolve(users);
            }
        });

        return deferred.promise;
    }



    /*
     *
     */
    function getAdminInfo() {
        var deferred = q.defer();

        UserModel.findOne({role:'ADMIN'}, function (err, dbAdmin) {
            if(err){
                logger.log("Error: Can not fetch admin info.");
                deferred.reject(err);
            } else {
                deferred.resolve(dbAdmin);
            }
        });

        return deferred.promise;
    }


    function updateUserPassword(userId, oldPassword, newPassword) {
        var deferred = q.defer();

        UserModel.findById(userId, function (err, user) {

            if(err){
                logger.error(err);
                deferred.reject(err);
            } else {
                if(user && bcrypt.compareSync(oldPassword, user.password)){
                    user.password = bcrypt.hashSync(newPassword);

                    UserModel.update({_id:userId},{$set:user}, function (err, dbUser) {
                        if(err) {

                            logger.error("Can not update user with id " + userId  + " Error: " + err);
                            deferred.reject(err);
                        }
                        else {

                            deferred.resolve(user);
                        }
                    });
                } else{
                    deferred.reject("Old Passwords do not match");
                }
            }
        });

        return deferred.promise;
    }
}