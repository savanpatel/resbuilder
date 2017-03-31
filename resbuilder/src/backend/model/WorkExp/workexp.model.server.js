/*
*  API for WorkExp schema in mongoose db.
*
* */

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var WorkExpSchema = require('./workexp.schema.server')(app, mongoose);
    var WorkExpModel = mongoose.model('WorkExp', WorkExpSchema);


    var api = {
        createWorkExp:createWorkExp,
        findWorkExpById:findWorkExpById,
        findWorkExpForUser:findWorkExpForUser,
        updateWorkExp:updateWorkExp,
        deleteWorkExp:deleteWorkExp
    };

    return api;


    /*
     * createWorkExp: Creates a new WorkExp in mongo db.
     * params: userId, WorkExp object created similar to WorkExpSchema.
     * returns: promise.
     */

    function createWorkExp(userId, workExp) {

        workExp.userId = userId;

        var deferred = q.defer();

        WorkExpModel.create(workExp, function (err, dbWorkExp) {

            if(err){
                logger.error('Unable to create workExp.');
                deferred.reject(err);
            } else {
                deferred.resolve(dbWorkExp);
            }

        });

        return deferred.promise;
    }




    /*
     * findWorkExpById : find workExp by workExp id.
     * params: workExpId
     * returns: promise
     */
    function findWorkExpById(workExpId) {

        var deferred = q.defer();

        WorkExpModel.findById(workExpId, function (err, dbWorkExp) {

            if(err){
                logger.error('Unable to find workExp. Id: ' + workExpId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbWorkExp);
            }
        });

        return deferred.promise;
    }



    /*
     * findWorkExpForUser: Finds list of workExps for user.
     * params: userId
     * returns: promise
     */
    function findWorkExpForUser(userId) {

        var deferred = q.defer();

        WorkExpModel.find({userId:userId}, function (err, dbWorkExp) {

            if(err){
                logger.error("Can not find workExp for user " + userId + " Error: "+ err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbWorkExp);
            }
        });


        return deferred.promise;
    }



    /*
     * updateWorkExp: updates the workExp.
     * params: workExpId and workExp object with updated fields.
     * returns: promise.
     */
    function updateWorkExp(workExpId, workExp) {

        var deferred = q.defer();
        WorkExpModel.update({_id:workExpId},{$set:workExp}, function (err, dbWorkExp) {
            if(err) {
                logger.erro("Can not update workExp with id " + workExpId  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbWorkExp);
            }
        });

        return deferred.promise;
    }



    /*
     * deleteWorkExp: deletes workExp from database.
     * params: workExpId
     * returns: promise
     */
    function deleteWorkExp(workExpId) {

        var deferred = q.defer();

        WorkExpModel.remove({_id:workExpId}, function (err) {
            if(err) {
                logger.error("Can not delete workExp with id " + workExpId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }


}

