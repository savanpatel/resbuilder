/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/resume", checkAuthorizedUser, createResume);
    app.get("/api/resume/:resumeId", checkAuthorizedUser, findResumeById);
    app.get("/api/resume/user/:userId", checkAuthorizedUser, findResumeforUser);
    app.put("/api/resume/:resumeId", checkAuthorizedUser, updateResume);
    app.delete("/api/resume/:resumeId", checkAuthorizedUser, deleteResume);






    var ResumeModel = mongooseAPI.resumeModelAPI;

    /*
     *  Handlers
     */
    function checkAuthorizedUser (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }
    /*
     * Handler for POST call /api/user
     */
    function createResume(req, res) {

        var resume = req.body;

        if(null == resume){
            req.sendStatus(500).send("null/empty resume");
            return;
        }


        // create user in db.
        ResumeModel.createResume(resume.userId, resume)
            .then(function (dbResume){

                if(null == dbProject){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbResume);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }




    /*
     *
     * Handler for find resume by resume id.
     *
     */
    function findResumeById(req, res) {

        var resumeId = req.params.resumeId;

        if(resumeId == null){
            res.sendStatus(500).send("null resumeId.");
            return;
        }

        ResumeModel.findResumeById(resumeId)
            .then(function (resume) {

                if(null == resume){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(resume);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }





    function findResumeforUser(req, res) {

        var userId = req.params.userId;


        if(userId == null){
            res.sendStatus(500).send("null userId");
            return;
        }

        ResumeModel.findResumeforUser(userId)
            .then(function (resume) {

                if(null == resume){
                    res.sendStatus(500).send("resume not found.");
                } else{
                    res.send(resume);
                }
            }, function (err) {
                logger.error("Can not fetch resumes for user. Error: " + err);
                res.send(err);
            });
    }




    /*
     * Handler for PUT call to update the resume.
     *
     */
    function updateResume(req, res) {

        var resumeId = req.params.resumeId;

        var resume = req.body;

        if(null == resumeId || null == project ||
            "" == resumeId)
        {
            res.sendStatus(500).send("resume or resumeId is null");
            return;
        }

        ResumeModel.updateResume(resumeId, resume)
            .then(function (newresume) {

                if(null == newresume){
                    res.sendStatus(500).send("could not update resume.");
                } else {
                    res.send(newresume);
                }
            }, function (err) {

                res.sendStatus(500).send(err);
            })
    }




    function deleteResume(req,res) {

        var resumeId = req.params.resumeId;

        if(null == resumeId || "" == resumeId){
            res.sendStatus(404);
            return;
        }

        ResumeModel.deleteResume(resumeId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}