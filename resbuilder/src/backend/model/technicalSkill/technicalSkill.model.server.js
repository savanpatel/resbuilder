/*
*  API for Education schema in mongoose db.
*
* */

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var TechnicalSkillSchema = require('./technicalSkill.schema.server')(app, mongoose);
    var TechnicalSkillModel = mongoose.model('TechnicalSkill', TechnicalSkillSchema);


    var api = {
        createTechnicalSkill:createTechnicalSkill,
        findTechnicalSkillById:findTechnicalSkillById,
        findTechnicalSkillForUser:findTechnicalSkillForUser,
        updateTechnicalSkill:updateTechnicalSkill,
        deleteTechnicalSkill:deleteTechnicalSkill,
        findUsersForTechnicalSkill:findUsersForTechnicalSkill
    };

    return api;


    /*
     * createTechnicalSkill: Creates a new TechnicalSkill in mongo db.
     * params: userId, TechnicalSkill object created similar to TechnicalSkillSchema.
     * returns: promise.
     */

    function createTechnicalSkill(userId, technicalSkill) {

        technicalSkill.userId = userId;

        var deferred = q.defer();

        TechnicalSkillModel.create(technicalSkill, function (err, dbTechnicalSkill) {

            if(err){
                logger.error('Unable to create technicalSkill.');
                deferred.reject(err);
            } else {
                deferred.resolve(dbTechnicalSkill);
            }

        });

        return deferred.promise;
    }




    /*
     * findTechnicalSkillById : find technicalSkill by technicalSkill id.
     * params: technicalSkillId
     * returns: promise
     */
    function findTechnicalSkillById(technicalSkillId) {

        var deferred = q.defer();

        TechnicalSkillModel.findById(technicalSkillId, function (err, dbTechnicalSkill) {

            if(err){
                logger.error('Unable to find technicalSkill. Id: ' + technicalSkillId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbTechnicalSkill);
            }
        });

        return deferred.promise;
    }



    /*
     * findTechnicalSkillForUser: Finds list of technicalSkills for user.
     * params: userId
     * returns: promise
     */
    function findTechnicalSkillForUser(userId) {

        var deferred = q.defer();

        TechnicalSkillModel.findOne({userId:userId}, function (err, dbTechnicalSkill) {

            if(err){
                logger.error("Can not find technicalSkill for user " + userId + " Error: "+ err);
                deferred.reject(err);
            } else {

                deferred.resolve(dbTechnicalSkill);
            }
        });


        return deferred.promise;
    }



    /*
     * updateTechnicalSkill: updates the technicalSkill.
     * params: technicalSkillId and technicalSkill object with updated fields.
     * returns: promise.
     */
    function updateTechnicalSkill(technicalSkillId, technicalSkill) {

        var deferred = q.defer();
        TechnicalSkillModel.update({_id:technicalSkillId},{$set:technicalSkill}, function (err, dbTechnicalSkill) {
            if(err) {
                logger.error("Can not update technicalSkill with id " + technicalSkillId  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbTechnicalSkill);
            }
        });

        return deferred.promise;
    }



    /*
     * deleteTechnicalSkill: deletes technicalSkill from database.
     * params: technicalSkillId
     * returns: promise
     */
    function deleteTechnicalSkill(technicalSkillId) {

        var deferred = q.defer();

        TechnicalSkillModel.remove({_id:technicalSkillId}, function (err) {
            if(err) {
                logger.error("Can not delete technicalSkill with id " + technicalSkillId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }


    function findUsersForTechnicalSkill(skill) {
        var deferred = q.defer();

        console.log("skill");
        console.log(skill)
        TechnicalSkillModel.find({$or : [{languages:{$in:[skill]}},
                {operatingSystems:{$in:[skill]}},
                {database:{$in:[skill]}},
                {technologies:{$in:[skill]}},
                {softwares:{$in:[skill]}}]},
            function (err, dbTechnicalSkills) {
                console.log(dbTechnicalSkills)

                if(err){
                    console.log(err)
                    deferred.reject(err);
                }
                else{
                    console.log("t")
                    deferred.resolve(dbTechnicalSkills);
                }
        });




        return deferred.promise;
    }
}

