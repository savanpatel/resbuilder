/*
 *  API for jobs schema in mongoose db.
 *
 * */

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var JobSchema = require('./job.schema.server.js')(app, mongoose);
    var JobModel = mongoose.model('Job', JobSchema);


    var api = {
        createJob:createJob,
        findJobById:findJobById,
        findJobForUser:findJobForUser,
        updateJob:updateJob,
        deleteJob:deleteJob
    };

    return api;
    /*
     * createJob: Creates a new Job in mongo db.
     * params: userId, Job object created similar to JobSchema.
     * returns: promise.
     */

    function createJob(job) {

        var deferred = q.defer();
        JobModel.create(job, function (err, dbJob) {
            if(err){
                logger.error('Unable to create job.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbJob);
            }
        });
        return deferred.promise;
    }

    /*
     * findJobById : find job by job id.
     * params: jobId
     * returns: promise
     */
    function findJobById(jobId) {

        var deferred = q.defer();

        JobModel.findById(jobId, function (err, dbJob) {

            if(err){
                logger.error('Unable to find job. Id: ' + jobId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbJob);
            }
        });

        return deferred.promise;
    }

    /*
     * findJobForUser: Finds list of jobs for user.
     * params: userId
     * returns: promise
     */
    function findJobForUser(userId) {


        var deferred = q.defer();
        JobModel.find({userId:userId}, function (err, dbJob) {
            if(err && !dbJob){
                logger.error("Can not find job for user " + userId + " Error: "+ err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbJob);
            }
        });
        return deferred.promise;
    }



    /*
     * updateJob: updates the job.
     * params: jonId and job object with updated fields.
     * returns: promise.
     */
    function updateJob(jobId, job) {

        var deferred = q.defer();
        JobModel.update({_id:jobId},{$set:job}, function (err, dbJob) {
            if(err) {
                logger.error("Can not update job with id " + dbJob  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(job);
            }
        });

        return deferred.promise;
    }

    /*
     * deleteJob: deletes job from database.
     * params: jobId
     * returns: promise
     */
    function deleteJob(jobId) {

        var deferred = q.defer();

        JobModel.remove({_id:jobId}, function (err) {
            if(err) {
                logger.error("Can not delete job with id " + jobId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });
        return deferred.promise;
    }
}

