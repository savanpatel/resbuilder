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
        findResumePDFforUser:findResumePDFforUser,
        findResumeDOCXforUser:findResumeDOCXforUser,
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

        resume.userId = userId;
        var deferred = q.defer();

        ResumeModel.create(project, function (err, dbResume) {

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

        ResumeModel.findById(resumeId, function (err, dbResume) {

            if(err){
                logger.error('Unable to find project. Id: ' + resumeId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbResume);
            }
        });

        return deferred.promise;
    }

    function findResumePDFforUser(userId) {

        var deferred = q.defer();

        ResumeModel.find({userId:userId},['urlPdf'],function (err, dbResumePDF) {

            if(err){
                logger.error("Can not find resume pdf for user " + userId + " Error: "+ err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbResumePDF);
            }
        });
        return deferred.promise;
    }

    function findResumeDOCXforUser(userId) {
        var deferred = q.defer();
        ResumeModel.find({userId:userId},['urlDocx'],function (err, dbResumeDOCX) {
            if(err){
                logger.error("Can not find resume Docx for user " + userId + " Error: "+ err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbResumeDOCX);
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