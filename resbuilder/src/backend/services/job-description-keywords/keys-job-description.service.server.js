/**
 * Created by panktibhalani on 4/4/17.
 */

module.exports = function (app,mongooseAPI) {

    var fs = require('fs');
    var q = require('q');
    var Sync = require('sync');
    var Promise = require('es6-promise').Promise;

    app.post("/api/getResumeData/:userId", createDoc);
    var userId;
    var EducationModel = mongooseAPI.educationModelAPI;
    var ProjectModel = mongooseAPI.projectModelAPI;
    var TechnicalSkillModel = mongooseAPI.technicalSkillModelAPI;
    var UserModel = mongooseAPI.userModelAPI;
    var WorkExpModel = mongooseAPI.workExpModelAPI;

    var educationDetails;
    var projectDetails;
    var technicalSkillDetails;
    var userDetails;
    var workDetails;
    var output;

    function createDoc(req,res) {

        userId = req.params.userId;

        createDoc1()
            .then(getDataAccToKeyWords)
            .then(print)

    }

    function executeAsynchronously(functions, timeout) {
        for(var i = 0; i < functions.length; i++) {
            setTimeout(functions[i], timeout);
            timeout += timeout
        }
    }

    function createDoc1() {

        return new Promise(function (resolve) {
            console.log("In server")
            console.log(userId)
            var PythonShell = require('python-shell');

            var options = {
                args: ['https://boards.greenhouse.io/endurance/jobs/645924#.WOL6CxLyto4'],
                scriptPath: __dirname
            };

            PythonShell.run('crawl.py', options, function (err, results) {
                if (err) {

                    reject(err)
                }
                else {
                    output = results
                    resolve()
                }
            });
        });

    }

    function print(){

            console.log(output[0])


            for (var a in projectDetails) {
                console.log(projectDetails[a].technologies);
            }
            for (var a in workDetails) {
                console.log(workDetails[a].technologies);
            }

    }

    function getDataAccToKeyWords() {

        return new Promise(function (resolve) {


            console.log("get data")
            EducationModel.findEducationForUser(userId)
                .then(function (education) {
                    //console.log(education)
                    if (education == null) {
                        logger.error("education not found");
                        reject(err)

                    }
                    else {
                        educationDetails = education;
                        ProjectModel.findProjectForUser(userId)
                            .then(function (project) {
                                //console.log(project)
                                if (project == null) {
                                    logger.error("Project not found");
                                    reject(err)

                                }
                                else
                                {
                                    projectDetails = project;

                                    TechnicalSkillModel.findTechnicalSkillForUser(userId)
                                        .then(function (techSkill) {
                                            //console.log(techSkill)
                                            if (techSkill == null) {
                                                logger.error("technical skill not found");
                                                reject(err)

                                            }
                                            else {
                                                technicalSkillDetails = techSkill;
                                                UserModel.findUserById(userId)
                                                    .then(function (user) {
                                                        //console.log(user)
                                                        if (user == null) {
                                                            logger.error("user not found");
                                                            reject(err)

                                                        }
                                                        else {
                                                            userDetails = user;
                                                            WorkExpModel.findWorkExpForUser(userId)
                                                                .then(function (work) {
                                                                    //console.log(work)
                                                                    if (work == null) {
                                                                        logger.error("work Experience not found");
                                                                        reject(err)

                                                                    }
                                                                    else {
                                                                        workDetails = work;
                                                                        resolve()
                                                                    }
                                                                }, function (err) {
                                                                    logger.error("Can not fetch Work Experience for user. Error: " + err);
                                                                    reject(err)
                                                                });

                                                        }
                                                    }, function (err) {
                                                        logger.error("Can not fetch details for user. Error: " + err);
                                                        reject(err)
                                                    });

                                            }
                                        }, function (err) {
                                            logger.error("Can not fetch technical skill for user. Error: " + err);
                                            reject(err)

                                        });
                                }

                            }, function (err) {
                                logger.error("Can not fetch project for user. Error: " + err);
                                reject(err)

                            });
                    }
                }, function (err) {
                    logger.error("Can not fetch education for user. Error: " + err);
                    reject(err)

                });

        });


    }


}