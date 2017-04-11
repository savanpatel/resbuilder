/**
 * Created by panktibhalani on 4/4/17.
 */

module.exports = function (app,mongooseAPI) {

    var fs = require('fs');
    var q = require('q');
    var Sync = require('sync');
    var Promise = require('es6-promise').Promise;
    var auth = authorized;

    app.get("/api/getResumeData/:userId", authorized, createDoc);

    var userId;
    var EducationModel = mongooseAPI.educationModelAPI;
    var ProjectModel = mongooseAPI.projectModelAPI;
    var TechnicalSkillModel = mongooseAPI.technicalSkillModelAPI;
    var UserModel = mongooseAPI.userModelAPI;
    var WorkExpModel = mongooseAPI.workExpModelAPI;
    var url;
    var educationDetails;
    var projectDetails;
    var technicalSkillDetails;
    var userDetails;
    var workDetails;
    var output;
    var Project = [];
    var Work = [];



    /*Passport related functions*/

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }


    function createDoc(req,res) {

        userId = req.params.userId;
        var newParams = req.query;
        url = newParams['url'];

        getKeyWords()
            .then(getData)
            .then(getDataAccToKeyWords)
            .then(function () {
                var ProjectDetails = []
                if(Project.length <= 4)
                {
                    for(var p in Project)
                    {
                        ProjectDetails.push(Project[p].details);
                    }
                }
                else
                {
                    for(var i =0;i<=3 ; i++)
                    {
                        ProjectDetails.push(Project[i].details)
                    }
                }
                var WorkDetails = []
                if(Work.length <= 2)
                {
                    for(var w in Work)
                    {
                        WorkDetails.push(Work[w].details);
                    }
                }
                else
                {
                    for(var i =0;i<=1 ; i++)
                    {
                        WorkDetails.push(Work[i].details)
                    }
                }

                var EducationDetails = []
                if(educationDetails.length <= 2)
                {
                    for(var e in educationDetails)
                    {
                        EducationDetails.push(educationDetails[e]);
                    }
                }
                else
                {
                    for(var i =0;i<=1 ; i++)
                    {
                        EducationDetails.push(educationDetails[i])
                    }
                }
                var data = {
                    "user":userDetails,
                    "education":EducationDetails,
                    "project":ProjectDetails,
                    "work":WorkDetails,
                    "technical":technicalSkillDetails
                }

                res.send(data);
                return true;
            },function (err) {
                console.log(err);
                res.sendStatus(404).send(err);
            });

    }


    function getKeyWords() {

        return new Promise(function (resolve,reject) {
            var PythonShell = require('python-shell');
            var options = {
                //args: ['https://boards.greenhouse.io/endurance/jobs/645924#.WOL6CxLyto4'],
                args:[url],
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

    function getDataAccToKeyWords(){
        return new Promise(function (resolve,reject) {
            var a = output[0].substring(1,output[0].length)
            var res = a.split(" ")

            for (var a in projectDetails) {

                var tech = projectDetails[a].technologies

                var hit = 0
                var i;
                for (i = 0; i < tech.length; i++) {
                    var new_tech = tech[i].toLowerCase();
                    var new_tech = new_tech.replace(/[^a-z]+/g, "")
                    var index = res.indexOf(new_tech);
                    if (index > -1) {
                        hit += 1
                    }
                }

                var jsonProject = {
                    "details": projectDetails[a],
                    "hit": hit
                }
                Project.push(jsonProject)
            }



        for (var b in workDetails) {

            var tech = workDetails[b].technologies

            var hit = 0
            var i;
            for (i = 0; i < tech.length; i++) {
                var new_tech = tech[i].toLowerCase();
                var new_tech = new_tech.replace(/[^a-z]+/g, "")
                var index = res.indexOf(new_tech);
                if (index > -1) {
                    hit += 1
                }
            }

            var jsonWork = {
                "details": workDetails[b],
                "hit": hit
            }
            Work.push(jsonWork)
        }
            Work.sort(function(a, b) {
                return  parseFloat(b.hit) - parseFloat(a.hit);
            });
            Project.sort(function(a, b) {
                return  parseFloat(b.hit) - parseFloat(a.hit);
            });

        resolve()
        });
    }

    function getData() {

        return new Promise(function (resolve,reject) {

            EducationModel.findEducationForUser(userId)
                .then(function (education) {

                    if (education == null) {
                        reject(err)
                    }
                    else {
                        educationDetails = education;
                        ProjectModel.findProjectForUser(userId)
                            .then(function (project) {

                                if (project == null) {
                                    reject(err)
                                }
                                else
                                {
                                    projectDetails = project;

                                    TechnicalSkillModel.findTechnicalSkillForUser(userId)
                                        .then(function (techSkill) {

                                            if (techSkill == null) {

                                                reject(err)

                                            }
                                            else {
                                                technicalSkillDetails = techSkill;
                                                UserModel.findUserById(userId)
                                                    .then(function (user) {

                                                        if (user == null) {

                                                            reject(err)

                                                        }
                                                        else {
                                                            userDetails = user;
                                                            WorkExpModel.findWorkExpForUser(userId)
                                                                .then(function (work) {

                                                                    if (work == null) {

                                                                        reject(err)

                                                                    }
                                                                    else {
                                                                        workDetails = work;
                                                                        resolve()
                                                                    }
                                                                }, function (err) {
                                                                    reject(err)
                                                                });

                                                        }
                                                    }, function (err) {
                                                        reject(err)
                                                    });

                                            }
                                        }, function (err) {
                                            reject(err)

                                        });
                                }

                            }, function (err) {
                                reject(err)

                            });
                    }
                }, function (err) {
                    reject(err)
                });
        });
    }


}