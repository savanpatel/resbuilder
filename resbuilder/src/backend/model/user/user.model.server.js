/*
 *  User database service.
 *
 */
module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var UserSchema = require('./user.schema.server')(app, mongoose);
    var UserModel = mongoose.model('User', UserSchema);


    var api = {
        createUser:createUser,
        findUserById:findUserById,
        findUserByUsername:findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser:updateUser,
        deleteUser:deleteUser,
        checkUsernameAvailable:checkUsernameAvailable,
        findUserByEmail:findUserByEmail,
        findAllUsers:findAllUsers,
        findBlockedUsers:findBlockedUsers,
        findUnBlockedUsers:findUnBlockedUsers,
        findUsersForIds:findUsersForIds,
        isAdmin: isAdmin
    };

    return api;

    function isAdmin(userId) {

        var deferred = q.defer();
        UserModel.findById(userId,function (err,user) {
            if(err){
                deferred.abort()
            }
            else {
                if(user.role === "admin"){
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

            console.log("in modal")
            console.log(users)
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
    function updateUser(userId, user) {

        var deferred = q.defer();
        UserModel.update({_id:userId},{$set:user}, function (err, dbUser) {
            if(err) {
                logger.error("Can not update user with id " + userId  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbUser);
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

        UserModel.findOne({username:username, password:password}, function (err, user) {

            if(err){
                logger.error("ERROR: [findUserByCredentials]: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(user);
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

        console.log(userIdList);
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

}