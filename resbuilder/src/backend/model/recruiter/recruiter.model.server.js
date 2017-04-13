/*
*  API for Project schema in mongoose db.
*
* */

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var RecruiterSchema = require('./recruiter.schema.server')(app, mongoose);
    var RecruiterModel = mongoose.model('Recruiter', RecruiterSchema);
    var bcrypt = require("bcrypt-nodejs");


    var api = {
        createRecruiter:createRecruiter,
        findRecruiterById:findRecruiterById,
        updateRecruiter:updateRecruiter,
        deleteRecruiter:deleteRecruiter,
        findRecruiterByCredentials: findRecruiterByCredentials,
        findAllRecruiters:findAllRecruiters,
        findBlockedRecruiters:findBlockedRecruiters,
        findUnBlockedRecruiters:findUnBlockedRecruiters,
        checkUsernameAvailable:checkUsernameAvailable,
        updateRecruiterPasswordByAdmin:updateRecruiterPasswordByAdmin,
        updateRecruiterPassword:updateRecruiterPassword
    };

    return api;

    function updateRecruiterPasswordByAdmin(recruiterId,newPassword) {

        console.log("update modal")

        var deferred = q.defer();

        newPassword = bcrypt.hashSync(newPassword);
        RecruiterModel.update({_id:recruiterId},{$set:{password:newPassword}}, function (err, dbRecruiter) {
            if(err) {
                logger.error("Can not update recruiter with id " + recruiterId  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbRecruiter);
            }
        });

        return deferred.promise;

    }


    function findAllRecruiters() {

        var deferred = q.defer();

        RecruiterModel.find({},function (err,recruiters) {

            if(err) {
                deferred.abort()
            }
            else{
                deferred.resolve(recruiters)
            }
        });
        return deferred.promise;

    }

    function findBlockedRecruiters() {

        var deferred = q.defer();

        RecruiterModel.findOne({'is_deleted':true},function (err,recruiters) {

            if(err) {
                deferred.abort()
            }
            else{
                deferred.resolve(recruiters)
            }
        });
        return deferred.promise;

    }

    function findUnBlockedRecruiters() {

        var deferred = q.defer();
        RecruiterModel.findOne({'is_deleted':false},function (err,recruiters) {
            if(err) {
                deferred.abort()
            }
            else{
                deferred.resolve(recruiters)
            }
        });
        return deferred.promise;
    }


    /*
     * createRecruiter: Creates a new Recruiter in mongo db.
     * returns: promise.
     */

    function createRecruiter(recruiter) {


        var deferred = q.defer();

        RecruiterModel.create(recruiter, function (err, dbRecruiter) {

            if(err){
                logger.error('Unable to create recruiter.' + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbRecruiter);
            }

        });

        return deferred.promise;
    }




    /*
     * findRecruiterById : find recruiter by recruiter id.
     * params: recruiterId
     * returns: promise
     */
    function findRecruiterById(recruiterId) {

        var deferred = q.defer();

        RecruiterModel.findById(recruiterId, function (err, dbRecruiter) {

            if(err){
                logger.error('Unable to find recruiter. Id: ' + recruiterId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbRecruiter);
            }
        });

        return deferred.promise;
    }




    /*
     * updateRecruiter: updates the recruiter.
     * params: recruiterId and recruiter object with updated fields.
     * returns: promise.
     */
    function updateRecruiter(recruiterId, recruiter) {

        var deferred = q.defer();
        RecruiterModel.update({_id:recruiterId},{$set:recruiter}, function (err, dbRecruiter) {
            if(err) {
                logger.error("Can not update recruiter with id " + recruiterId  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbRecruiter);
            }
        });

        return deferred.promise;
    }



    /*
     * deleteRecruiter: deletes recruiter from database.
     * params: recruiterId
     * returns: promise
     */
    function deleteRecruiter(recruiterId) {

        var deferred = q.defer();

        RecruiterModel.remove({_id:recruiterId}, function (err) {
            if(err) {
                logger.error("Can not delete recuieter with id " + recruiterId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }


    /*
     * Find recruiter by credentials.
     */
    function findRecruiterByCredentials(username, password) {
        var deferred = q.defer();

        console.log(password);

        RecruiterModel.findOne({username:username}, function (err, recruiter) {

            console.log(recruiter.password);
            console.log(bcrypt.hashSync(password));
            if(recruiter && bcrypt.compareSync(password, recruiter.password)) {
                if (!recruiter.is_deleted) {
                    if (err) {
                        logger.error("ERROR: [findUserByCredentials]: " + err);
                        deferred.reject(err);
                    } else {
                        deferred.resolve(recruiter);
                    }
                }
                else {
                    deferred.reject("recruiter is blocked");
                }
            }
            else{
                deferred.reject("incorrect password");
            }
        });


        return deferred.promise;
    }



    function checkUsernameAvailable(username) {
        var deferred = q.defer();

        RecruiterModel.findOne({username:username}, function (err, recruiter) {

            if(err){
                logger.error("ERROR: [checkUsernameAvailable]: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(recruiter);
            }
        });


        return deferred.promise;
    }


    function updateRecruiterPassword(recruiterId, oldPassword, newPassword) {
        var deferred = q.defer();

        RecruiterModel.findById(recruiterId, function (err, recruiter) {

            if(err){
                logger.error(err);
                deferred.reject(err);
            } else {
                if(recruiter && bcrypt.compareSync(oldPassword, recruiter.password)){
                    recruiter.password = bcrypt.hashSync(newPassword);

                    RecruiterModel.update({_id:recruiterId},{$set:recruiter}, function (err, dbRecruiter) {
                        if(err) {
                            logger.error("Can not update user with id " + userId  + " Error: " + err);
                            deferred.reject(err);
                        }
                        else {

                            deferred.resolve(recruiter);
                        }
                    });
                } else{
                    deferred.reject("Old Password do not match");
                }
            }
        });

        return deferred.promise;
    }
}

