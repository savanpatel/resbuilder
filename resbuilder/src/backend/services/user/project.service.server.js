/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/project",checkAuthorizedUser, createProject);
    app.get("/api/project/:projectId",checkAuthorizedUser, findProjectById);
    app.get("/api/project/user/:userId",checkAuthorizedUser, getProjectForUser);
    app.put("/api/project/:projectId",checkAuthorizedUser, updateProject);
    app.delete("/api/project/:projectId",checkAuthorizedUser, deleteProject);



    var ProjectModel = mongooseAPI.projectModelAPI;





    function checkAuthorizedUser (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }


    /*
     *  Handlers
     */

    
    

    /*
     * Handler for POST call /api/user
     */
    function createProject(req, res) {

        var project = req.body;

        if(null == project){
            req.sendStatus(500).send("null/empty project");
            return;
        }


        // create user in db.
        ProjectModel.createProject(project.userId, project)
            .then(function (dbProject){

                if(null == dbProject){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbProject);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        
    }
    



    /*
     *
     * Handler for find project bhy project id.
     *
     */
    function findProjectById(req, res) {

        var projectId = req.params.projectId;

        if(projectId == null){
            res.sendStatus(500).send("null projectId.");
            return;
        }

        ProjectModel.findProjectById(projectId)
            .then(function (project) {

                if(null == project){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(project);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }





    function getProjectForUser(req, res) {

        var userId = req.params.userId;

        if(userId == null){
            res.sendStatus(500).send("null userId");
            return;
        }

        ProjectModel.findProjectForUser(userId)
            .then(function (project) {

                if(null == project){
                    res.sendStatus(500).send("project not found.");
                } else{
                    res.send(project);
                }
            }, function (err) {
                logger.error("Can not fetch projects for user. Error: " + err);
                res.send(err);
            });
    }



    /*
     * Handler for PUT call to update the project.
     *
     */
    function updateProject(req, res) {

        var projectId = req.params.projectId;

        var project = req.body;

        if(null == projectId || null == project ||
          "" == projectId)
        {
            res.sendStatus(500).send("Project or projectId is null");
            return;
        }

        ProjectModel.updateProject(projectId, project)
            .then(function (project) {

                if(null == project){
                    res.sendStatus(500).send("could not update project.");
                } else {
                    res.send(project);
                }
            }, function (err) {

                res.sendStatus(500).send(err);
            })
    }




    function deleteProject(req,res) {

        var projectId = req.params.projectId;

        if(null == projectId || "" == projectId){
            res.sendStatus(404);
            return;
        }

        ProjectModel.deleteProject(projectId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}