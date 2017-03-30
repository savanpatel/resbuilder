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
        updateUser:updateUser,
        deleteUser:deleteUser
    };

    return api;



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
                logger.erro("Can not update user with id " + userId  + " Error: " + err);
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

}