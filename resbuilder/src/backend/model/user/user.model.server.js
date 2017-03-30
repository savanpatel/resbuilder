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
        findUserById:findUserById
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
                logger.error('Unable to find user.');
                deferred.reject(err);
            } else {
                deferred.resolve(dbUser);
            }
        });

        return deferred.promise;
    }


}