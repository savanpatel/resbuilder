/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {



    app.post("/api/recruiter", createRecruiter);
    app.get("/api/recruiter/:recruiterId", checkAuthorizedUser, findRecruiterById);
    app.put("/api/recruiter/:recruiterId", checkAuthorizedUser, updateRecruiter);
    app.delete("/api/recruiter/:recruiterId", checkAuthorizedUser, deleteRecruiter);
    app.get("/api/recruiter/:recruiterId/user/skill", checkAuthorizedUser, findUsersBySkill);
    app.get("/api/recruiter/username/:username", checkUsernameAvailable);



    var RecruiterModel = mongooseAPI.recruiterModelAPI;
    var UserModel = mongooseAPI.userModelAPI;
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
     * TODO: find for list of skills.
     *  Currently this finds for only one skill. (First one).
     */
    function findUsersBySkill(req, res) {

        var recruiterId = req.params.recruiterId;


        if(recruiterId == null){
            res.sendStatus(500).send("null recruiterId.");
            return;
        }


        var queryParams = req.query;

        var skills = queryParams.skills;
        if(null == skills || skills == ""){
            res.sendStatus(400).send("null or empty skills provided.");
            return;
        }

        var skillsArr = skills.split(',');

            TechnicalSkillModel.findUsersForTechnicalSkill(skillsArr[0].toLowerCase())
            .then(function (dbTechnicalSkills){
                var userList = [];

                for(var t in dbTechnicalSkills){
                    userList.push(dbTechnicalSkills[t].userId);
                }


                return UserModel.findUsersForIds(userList);

            }, function (err) {
                res.sendStatus(500).send(err);
            })
            .then(function (dbUsers) {

                console.log(dbUsers);
                var retList = [];
                for(var u in dbUsers){
                    var user = JSON.parse(JSON.stringify(dbUsers[u]));
                    user.password = null;
                    retList.push(user);
                    console.log("list")
                    console.log(retList);
                }

                res.send(retList);
            }, function (err) {
                res.sendStatus(500).send("Can not find users." + err);
            });
    }
    
    

    /*
     * Handler for POST call /api/user
     */
    function createRecruiter(req, res) {

        var recruiter = req.body;

        if(null == recruiter){
            req.sendStatus(500).send("null/empty recruiter");
            return;
        }


        // create user in db.
        RecruiterModel.createRecruiter(recruiter)
            .then(function (dbRecruiter){

                if(null == dbRecruiter){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbRecruiter);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    


    /*
     *
     * Handler for find education by education id.
     *
     */
    function findRecruiterById(req, res) {

        var recruiterId = req.params.recruiterId;


        if(recruiterId == null){
            res.sendStatus(500).send("null recruiterId.");
            return;
        }

        RecruiterModel.findRecruiterById(recruiterId)
            .then(function (dbRecruiter) {

                if(null == dbRecruiter){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(dbRecruiter);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }






    /*
     * Handler for PUT call to update the recruiter.
     *
     */
    function updateRecruiter(req, res) {

        var recruiterId = req.params.recruiterId;

        var recruiter = req.body;

        if(null == recruiterId || null == recruiter ||
          "" == recruiterId)
        {
            res.sendStatus(500).send("recruiterId or recruiter is null");
            return;
        }

        RecruiterModel.updateRecruiter(recruiter, recruiter)
            .then(function (dbRecruiter) {

                if(null == recruiter){
                    res.sendStatus(500).send("could not update recruiter.");
                } else {
                    res.send(recruiter);
                }
            }, function (err) {

                res.sendStatus(500).send(err);
            });
    }




    /*
     * Handles DELETE call to recruiter. Deletes the recruiter
     */
    function deleteRecruiter(req,res) {

        var recruiterId = req.params.recruiterId;

        if(null == recruiterId || "" == recruiterId){
            res.sendStatus(404);
            return;
        }

        RecruiterModel.deleteRecruiter(recruiterId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }



    /*
     *
     * Handler for GET call to /api/recruiter
     *
     */
    function findRecruiterByCredentials(req, res) {

        var queryParams = req.query;

        var username = queryParams.username;
        var password = queryParams.password;

        if(null == username || null == password ||
            "" == username || "" == password){
            res.sendStatus(500).send("null/empty username or password");
            return;
        }

        RecruiterModel
            .findRecruiterByCredentials(username, password)
            .then(function (recruiter) {

                if(null == recruiter) {
                    // user not found in db.
                    res.sendStatus(404).send("User not found.");
                } else {
                    res.send(recruiter);
                }

            }, function (err) {
                // error on database side.
                res.sendStatus(404).send(err);
            });
    }



    /*Handler for GET call to check if username is available*/
    function checkUsernameAvailable(req, res) {

        var username = req.params.username;

        if(null == username || username == ""){
            var response = {
                isAvailable:false
            };

            res.send(response);
            return;
        }



        RecruiterModel.checkUsernameAvailable(username)
            .then(function (recruiter) {
                if(recruiter){
                    res.send({isAvailable:false});
                } else{
                    res.send({isAvailable:true});
                }

            }, function (err) {
                res.send({isAvailable:false})
            });

    }

}