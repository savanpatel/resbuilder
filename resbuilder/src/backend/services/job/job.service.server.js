/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    var request = require('request');

    app.post("/api/job", checkAuthorizedUser, createJob);
    app.get("/api/job/:jobId", checkAuthorizedUser, findJobById);
    app.get("/api/job/user/:userId", checkAuthorizedUser, findJobForUser);
    app.put("/api/job/:jobId", checkAuthorizedUser, updateJob);
    app.delete("/api/job/:jobId", checkAuthorizedUser, deleteJob);
    app.get("/api/job/suggest/:skill", checkAuthorizedUser, suggestJob);


    var JobModel = mongooseAPI.jobModelAPI;

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


    function suggestJob(req, res) {
        var skill = req.params.skill;
        console.log(skill);


        request("https://jobs.github.com/positions.json?description=" + skill, function (err, result, body) {
            if(err){
                res.sendStatus(500).send("Could not fetch jobs.");
            } else{
                res.send(body);
            }
        });
    }
    /*
     * Handler for POST call /api/user
     */
    function createJob(req, res) {

        var job = req.body;

        if(null == job){
            req.sendStatus(500).send("null/empty job");
            return;
        }



        // create job in db.
        JobModel.createJob(job)
            .then(function (dbJob){

                if(null == dbJob){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbJob);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    /*
     *
     * Handler for find job by job id.
     *
     */
    function findJobById(req, res) {

        var jobId = req.params.jobId;


        if(jobId == null){
            res.sendStatus(500).send("null jobId.");
            return;
        }

        JobModel.findJobById(jobId)
            .then(function (dbJob) {

                if(null == dbJob){
                    // job not found
                    res.sendStatus(404);
                }else {
                    // job found.
                    res.send(dbJob);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }





    function findJobForUser(req, res) {

        var userId = req.params.userId;

        if(userId == null){
            res.sendStatus(500).send("null userId");
            return;
        }

        JobModel.findJobForUser(userId)
            .then(function (job) {

                console.log(job);
                if(null == job){
                    res.sendStatus(500).send("job not found.");
                } else{
                    res.send(job);
                }
            }, function (err) {
                logger.error("Can not fetch job for user. Error: " + err);
                res.send(err);
            });
    }



    /*
     * Handler for PUT call to update the job.
     *
     */
    function updateJob(req, res) {

        var jobId = req.params.jobId;

        var job = req.body;

        if(null == jobId || null == job ||
            "" == jobId)
        {
            res.sendStatus(500).send("education or educationId is null");
            return;
        }

        JobModel.updateJob(jobId, job)
            .then(function (dbjob) {

                if(null == dbjob){
                    res.sendStatus(500).send("could not update job.");
                } else {
                    res.send(dbjob);
                }
            }, function (err) {

                res.sendStatus(500).send(err);
            })
    }




    function deleteJob(req,res) {

        var jobId = req.params.jobId;

        if(null == jobId || "" == jobId){
            res.sendStatus(404);
            return;
        }

        JobModel.deleteJob(jobId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}