/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/workexp", createWorkExp);
    app.get("/api/workexp/:workexpId", findWorkExpById);
    app.get("/api/workexp/user/:userId", getWorkExpForUser);
    app.put("/api/workexp/:workexpId", updateWorkExp);
    app.delete("/api/workexp/:workexpId", deleteWorkExp);



    var WorkExpModel = mongooseAPI.workExpModelAPI;

    
    
    
    /*
     *  Handlers
     */

    
    

    /*
     * Handler for POST call /api/user
     */
    function createWorkExp(req, res) {

        var workexp = req.body;

        if(null == workexp){
            req.sendStatus(500).send("null/empty project");
            return;
        }


        // create user in db.
        WorkExpModel.createWorkExp(workexp, workexp.userId)
            .then(function (dbWorkExp){

                if(null == dbWorkExp){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbWorkExp);
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
    function findWorkExpById(req, res) {

        var workexpId = req.params.workexpId;


        if(workexpId == null){
            res.sendStatus(500).send("null educationId.");
            return;
        }

        WorkExpModel.findWorkExpById(workexpId)
            .then(function (dbWorkExp) {

                if(null == dbWorkExp){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(dbWorkExp);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }





    function getWorkExpForUser(req, res) {

        var userId = req.params.userId;

        if(userId == null){
            res.sendStatus(500).send("null workexpId");
            return;
        }

        WorkExpModel.findWorkExpForUser(userId)
            .then(function (dbWorkExp) {

                if(null == dbWorkExp){
                    res.sendStatus(500).send("workexp not found.");
                } else{
                    res.send(dbWorkExp);
                }
            }, function (err) {
                logger.error("Can not fetch workexp for user. Error: " + err);
                res.send(err);
            });
    }



    /*
     * Handler for PUT call to update the project.
     *
     */
    function updateWorkExp(req, res) {

        var workexpId = req.params.workexpId;

        var workexp = req.body;

        if(null == workexpId|| null == workexp||
          "" == workexpId)
        {
            res.sendStatus(500).send("workexp or workexpId is null");
            return;
        }

        WorkExpModel.updateWorkExp(workexpId, workexp)
            .then(function (dbWorkExp) {

                if(null == dbWorkExp){
                    res.sendStatus(500).send("could not update education.");
                } else {
                    res.send(dbWorkExp);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }




    function deleteWorkExp(req,res) {

        var workexpId = req.params.workexpId;

        if(null == workexpId || "" == workexpId){
            res.sendStatus(404);
            return;
        }

        WorkExpModel.deleteWorkExp(workexpId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}