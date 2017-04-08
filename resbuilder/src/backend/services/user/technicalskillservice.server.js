/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/technicalskill",checkAuthorizedUser, createTechnicalSkill);
    
    app.get("/api/technicalskill/:technicalSkillId",checkAuthorizedUser, findTechnicalSkillById);
    app.get("/api/technicalskill/user/:userId",checkAuthorizedUser, findTechnicalSkillForUser);
    app.put("/api/technicalskill/:technicalskillId", checkAuthorizedUser, updateTechnicalSkill);
    app.delete("/api/technicalskill/:technicalskillId", checkAuthorizedUser, deleteTechnicalSkill);



    var TechnicalSkillModel = mongooseAPI.technicalSkillModelAPI;




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
     * Handler for POST call /api/technicalskill
     */
    function createTechnicalSkill(req, res) {

        var technicalSkill = req.body;

        if(null == technicalSkill){
            req.sendStatus(500).send("null/empty technical skill.");
            return;
        }


        // create user in db.
        TechnicalSkillModel.createTechnicalSkill(technicalSkill)
            .then(function (dbTechnicalSkill){

                if(null == dbTechnicalSkill){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbTechnicalSkill);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        
    }
    



    /*
     *
     * Handler for find technical skill by id.
     *
     */
    function findTechnicalSkillById(req, res) {

        var technicalSkillId = req.params.technicalSkillId;

        if(technicalSkillId == null){
            res.sendStatus(500).send("null technicalSkillId.");
            return;
        }

        TechnicalSkillModel.findTechnicalSkillById(technicalSkillId)
            .then(function (technicalSkill) {

                if(null == technicalSkill){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(technicalSkill);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }





    function findTechnicalSkillForUser(req, res) {
        
        var userId = req.params.userId;

        if(null == userId){
            res.sendStatus(500).send("null/empty userId");
            return;
        }
        


        TechnicalSkillModel.findTechnicalSkillForUser(userId)
            .then(function (technicalSkill) {

                if(null == technicalSkill){

                    var newTechnicalSkill = {
                        userId: userId,
                        languages:[],
                        technologies:[],
                        database:[],
                        softwares:[],
                        operatingSystems:[]
                    };


                    TechnicalSkillModel.createTechnicalSkill(userId,newTechnicalSkill)
                        .then(function (dbTechnicalSkill) {

                            res.send(dbTechnicalSkill);
                        }, function (err) {
                            res.sendStatus(500).send(err);
                        });

                } else{
                    res.send(technicalSkill);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    
    



    /*
     *
     * Handler for update user PUT call.
     */
    function updateTechnicalSkill(req, res) {

        var techicalSkill = req.body;
        var technicalSkillId = req.params.technicalskillId;

        if(null == techicalSkill){
            res.sendStatus(500).send("null/empty technicalSkill for update.");
            return;
        }

        TechnicalSkillModel.updateTechnicalSkill(technicalSkillId, techicalSkill)
            .then(function (dbTechnicalSkill) {

                if(null == dbTechnicalSkill){
                    res.sendStatus(500).send("Could not update technical skill.");
                } else {
                    res.send(techicalSkill);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }




    /*
     * Handler for delete user DELETE call.
     */
    function deleteTechnicalSkill(req, res) {

        var technicalSkill = req.params.technicalskillId;

        if(null == technicalSkill){
            res.sendStatus(404);
            return;
        }

        TechnicalSkillModel.deleteTechnicalSkill(technicalSkill)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}