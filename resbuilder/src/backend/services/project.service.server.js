/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/project", createProject);
    app.get("/api/project/:projectId", findProjectById);


    app.get("/api/project/user/:userId", getProjectByUserId);

    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);



    var ProjectModel = mongooseAPI.projectModelAPI;

    
    
    
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
        ProjectModel.createProject(project)
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
     * Handler for find user by user id.
     *
     */
    function findProjectById(req, res) {

        var projectId = req.params.projectId;

        if(projectId == null){
            res.sendStatus(500).send("null projectId.");
            return;
        }

        ProjectModel.findProjectById(userId)
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




    /*
     *
     * Handler for update user PUT call.
     */
    function updateUser(req, res) {

        var user = req.body;
        var userId = req.params.userId;

        if(null == user){
            res.sendStatus(500).send("null/empty user for update.");
            return;
        }

        UserModel.updateUser(userId, user)
            .then(function (dbUser) {

                if(null == dbUser){
                    res.sendStatus(500).send("Could not update user.");
                } else {
                    res.send(user);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }




    /*
     * Handler for delete user DELETE call.
     */
    function deleteUser(req, res) {

        var userId = req.params.userId;

        if(null == userId){
            res.sendStatus(404);
            return;
        }

        UserModel.deleteUser(userId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}