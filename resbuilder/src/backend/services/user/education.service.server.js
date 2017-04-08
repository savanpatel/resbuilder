/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/education", checkAuthorizedUser, createEducation);
    app.get("/api/education/:educationId", checkAuthorizedUser, findEducationById);
    app.get("/api/education/user/:userId", checkAuthorizedUser, getEducationForUser);
    app.put("/api/education/:educationId", checkAuthorizedUser, updateEducation);
    app.delete("/api/education/:educationId", checkAuthorizedUser, deleteEducation);



    var EducationModel = mongooseAPI.educationModelAPI;


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
    function createEducation(req, res) {

        var education = req.body;

        if(null == education){
            req.sendStatus(500).send("null/empty education");
            return;
        }


        console.log(education);
        // create user in db.
        EducationModel.createEducation(education)
            .then(function (dbEducation){

                if(null == dbEducation){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbEducation);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    



    /*
     *
     * Handler for find education bhy education id.
     *
     */
    function findEducationById(req, res) {

        var educationId = req.params.educationId;


        if(educationId == null){
            res.sendStatus(500).send("null educationId.");
            return;
        }

        EducationModel.findEducationById(educationId)
            .then(function (dbEducation) {

                if(null == dbEducation){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(dbEducation);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }





    function getEducationForUser(req, res) {

        var userId = req.params.userId;

        if(userId == null){
            res.sendStatus(500).send("null userId");
            return;
        }

        EducationModel.findEducationForUser(userId)
            .then(function (education) {

                if(null == education){
                    res.sendStatus(500).send("education not found.");
                } else{
                    res.send(education);
                }
            }, function (err) {
                logger.error("Can not fetch education for user. Error: " + err);
                res.send(err);
            });
    }



    /*
     * Handler for PUT call to update the education.
     *
     */
    function updateEducation(req, res) {

        var educationId = req.params.educationId;

        var education = req.body;

        if(null == educationId || null == education ||
          "" == educationId)
        {
            res.sendStatus(500).send("education or educationId is null");
            return;
        }

        EducationModel.updateEducation(educationId, education)
            .then(function (education) {

                if(null == education){
                    res.sendStatus(500).send("could not update education.");
                } else {
                    res.send(education);
                }
            }, function (err) {

                res.sendStatus(500).send(err);
            })
    }




    function deleteEducation(req,res) {

        var educationId = req.params.educationId;

        if(null == educationId || "" == educationId){
            res.sendStatus(404);
            return;
        }

        EducationModel.deleteEducation(educationId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}