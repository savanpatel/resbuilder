/*
 *  API for Resume schema in mongoose db.
 *
 * */

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var ResumeSchema = require('./resume.schema.server')(app, mongoose);
    var ResumeModel = mongoose.model('Resume', ResumeSchema);

    var api = {
        createResume:createResume,
        findResumeById:findResumeById,
        findResumeforUser:findResumeforUser,

        updateResume:updateResume,
        deleteResume:deleteResume
    };
    return api;

    /*
     * createResume: Creates a new Resume in mongo db.
     * params: userId, Project object created similar to ResumeSchema.
     * returns: promise.
     */

    function createResume(userId, resume) {

        console.log("createResume")
        console.log(resume)
        console.log(userId)
        resume.userId = userId;
        var deferred = q.defer();

        ResumeModel.create(resume, function (err, dbResume) {
            console.log(dbResume)

            if(err){
                logger.error('Unable to create resume.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbResume);
            }
        });

        return deferred.promise;
    }

    function findResumeById(resumeId) {

        var deferred = q.defer();
        console.log(resumeId)
        ResumeModel.findById(resumeId, function (err, dbResume) {

            if(err){
                console.log(err)
                logger.error('Unable to find project. Id: ' + resumeId + "Error: " + err);
                deferred.reject(err);
            } else {
                console.log(dbResume)
                deferred.resolve(dbResume);
            }
        });

        return deferred.promise;
    }

    function findResumeforUser(userId) {

        var deferred = q.defer();

        ResumeModel.find({userId:userId},['filename'],function (err, dbResumePDF) {

            if(err){
                logger.error("Can not find resume pdf for user " + userId + " Error: "+ err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbResumePDF);
            }
        });
        return deferred.promise;
    }



    function updateResume(resumeID, resume) {
        var deferred = q.defer();
        ResumeModel.update({_id:resumeID},{$set:resume}, function (err, dbResume) {
            if(err) {
                logger.error("Can not update resume with id " + resumeID  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbResume);
            }
        });
        return deferred.promise;
    }

    function deleteResume(resumeId) {

        var deferred = q.defer();

        ResumeModel.remove({_id:resumeId}, function (err) {
            if(err) {
                logger.error("Can not delete resume with id " + resumeId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }


}