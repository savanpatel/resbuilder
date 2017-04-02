/*
*  API for Education schema in mongoose db.
*
* */

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var EducationSchema = require('./education.schema.server')(app, mongoose);
    var EducationModel = mongoose.model('Education', EducationSchema);


    var api = {
        createEducation:createEducation,
        findEducationById:findEducationById,
        findEducationForUser:findEducationForUser,
        updateEducation:updateEducation,
        deleteEducation:deleteEducation
    };

    return api;


    /*
     * createEducation: Creates a new Education in mongo db.
     * params: userId, Education object created similar to EducationSchema.
     * returns: promise.
     */

    function createEducation(education) {

        var deferred = q.defer();

        EducationModel.create(education, function (err, dbEducation) {

            if(err){
                logger.error('Unable to create education.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbEducation);
            }

        });

        return deferred.promise;
    }




    /*
     * findEducationById : find education by education id.
     * params: educationId
     * returns: promise
     */
    function findEducationById(educationId) {

        var deferred = q.defer();

        EducationModel.findById(educationId, function (err, dbEducation) {

            if(err){
                logger.error('Unable to find education. Id: ' + educationId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbEducation);
            }
        });

        return deferred.promise;
    }



    /*
     * findEducationForUser: Finds list of educations for user.
     * params: userId
     * returns: promise
     */
    function findEducationForUser(userId) {

        var deferred = q.defer();

        EducationModel.find({userId:userId}, function (err, dbEducation) {

            if(err){
                logger.error("Can not find education for user " + userId + " Error: "+ err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbEducation);
            }
        });


        return deferred.promise;
    }



    /*
     * updateEducation: updates the education.
     * params: educationId and education object with updated fields.
     * returns: promise.
     */
    function updateEducation(educationId, education) {

        var deferred = q.defer();
        EducationModel.update({_id:educationId},{$set:education}, function (err, dbEducation) {
            if(err) {
                logger.error("Can not update education with id " + educationId  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbEducation);
            }
        });

        return deferred.promise;
    }



    /*
     * deleteEducation: deletes education from database.
     * params: educationId
     * returns: promise
     */
    function deleteEducation(educationId) {

        var deferred = q.defer();

        EducationModel.remove({_id:educationId}, function (err) {
            if(err) {
                logger.error("Can not delete education with id " + educationId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }


}

