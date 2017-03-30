/*
*  API for Project schema in mongoose db.
*
* */

module.exports = function (app, mongoose, logger) {

    var q = require('q');
    var ProjectSchema = require('./project.schema.server')(app, mongoose);
    var ProjectModel = mongoose.model('Project', ProjectSchema);


    var api = {
        createProject:createProject,
        findProjectById:findProjectById,
        findProjectForUser:findProjectForUser,
        updateProject:updateProject,
        deleteProject:deleteProject
    };

    return api;


    /*
     * createProject: Creates a new Project in mongo db.
     * params: userId, Project object created similar to ProjectSchema.
     * returns: promise.
     */

    function createProject(userId, project) {

        project.userId = userId;

        var deferred = q.defer();

        ProjectModel.create(project, function (err, dbProject) {

            if(err){
                logger.error('Unable to create project.');
                deferred.reject(err);
            } else {
                deferred.resolve(dbProject);
            }

        });

        return deferred.promise;
    }




    /*
     * findProjectById : find project by project id.
     * params: projectId
     * returns: promise
     */
    function findProjectById(projectId) {

        var deferred = q.defer();

        ProjectModel.findById(projectId, function (err, dbProject) {

            if(err){
                logger.error('Unable to find project. Id: ' + projectId + "Error: " + err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbProject);
            }
        });

        return deferred.promise;
    }



    /*
     * findProjectForUser: Finds list of projects for user.
     * params: userId
     * returns: promise
     */
    function findProjectForUser(userId) {

        var deferred = q.defer();

        ProjectModel.find({userId:userId}, function (err, dbProject) {

            if(err){
                logger.error("Can not find project for user " + userId + " Error: "+ err);
                deferred.reject(err);
            } else {
                deferred.resolve(dbProject);
            }
        });


        return deferred.promise;
    }



    /*
     * updateProject: updates the project.
     * params: projectId and project object with updated fields.
     * returns: promise.
     */
    function updateProject(projectId, project) {

        var deferred = q.defer();
        ProjectModel.update({_id:projectId},{$set:project}, function (err, dbProject) {
            if(err) {
                logger.erro("Can not update project with id " + projectId  + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(dbProject);
            }
        });

        return deferred.promise;
    }



    /*
     * deleteProject: deletes project from database.
     * params: projectId
     * returns: promise
     */
    function deleteProject(projectId) {

        var deferred = q.defer();

        ProjectModel.remove({_id:projectId}, function (err) {
            if(err) {
                logger.error("Can not delete project with id " + projectId + " Error: " + err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(200);
            }
        });

        return deferred.promise;
    }


}

