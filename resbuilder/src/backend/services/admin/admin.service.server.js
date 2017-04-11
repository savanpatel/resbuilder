module.exports = function (app, mongooseAPI) {

    app.get('/api/admin/:adminId/recruiters',authoriseAdmin,findAllRecruiters);
    app.get('/api/admin/:adminId/users',authoriseAdmin,findAllUsers);
    app.get('/api/admin/:adminId/stats',authoriseAdmin,getAllStats);
    app.put("/api/admin/:adminId/user",authoriseAdmin,updateUserByAdmin);
    app.put("/api/admin/:adminId/recruiter",authoriseAdmin,updateRecruiterByAdmin);
    app.delete("/api/admin/:adminId/user/:userId",authoriseAdmin,deleteUserByAdmin);
    app.delete("/api/admin/:adminId/recruiter/:recruiterId",authoriseAdmin,deleteUserByRecruiter);


    var UserModel = mongooseAPI.userModelAPI;
    var RecruiterModel = mongooseAPI.recruiterModelAPI;


    
    function deleteUserByAdmin(req,res) {



        var userId = req.params.userId;

        if(userId == null){
            res.sendStatus(500).send("null/empty user for delete.");
            return;
        }

        UserModel.deleteUser(userId)
            .then(function (status) {
                console.log("delete done")
                res.sendStatus(200);
            },function (err) {
                console.log(err)
                res.send(401).send(err);
            });
    }

    function deleteUserByRecruiter(req,res) {
        var recruiterId = req.params.recruiterId;
        if(recruiterId == null){
            res.sendStatus(500).send("null/empty user for delete.");
            return;
        }
        RecruiterModel.deleteRecruiter(recruiterId)
            .then(function (status) {
            res.sendStatus(status);
        },function (err) {
            res.send(401).send(err);
        });
    }

    function updateRecruiterByAdmin(req,res) {
        var recruiter = req.body;
        var adminId = req.params.adminId;

        if (null == recruiter) {
            res.sendStatus(500).send("null/empty user for update.");
            return;
        }

        RecruiterModel.updateRecruiter(recruiter['_id'], recruiter)
            .then(function (dbRecruiter) {
                if (null == dbRecruiter) {
                    res.sendStatus(500).send("Could not update user.");
                } else {
                    res.send(dbRecruiter);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });


    }
    function authoriseAdmin(req,res,next) {

        console.log("autho")
        var adminId = req.params.adminId;
        var promise = UserModel.isAdmin(adminId);
        promise
            .then(function (isadmin) {

                if(isadmin){
                    next();
                }
                else{
                    res.send(401);
                }
            },function (err) {
                res.send(401);
            });
    }

    function updateUserByAdmin(req, res) {

        var user = req.body;
        var adminId = req.params.adminId;

                    if (null == user) {
                        res.sendStatus(500).send("null/empty user for update.");
                        return;
                    }

                    UserModel.updateUser(user['_id'], user)
                        .then(function (dbUser) {
                            if (null == dbUser) {
                                res.sendStatus(500).send("Could not update user.");
                            } else {
                                res.send(dbUser);
                            }
                        }, function (err) {
                            res.sendStatus(500).send(err);
                        });

    }

    
    function getAllStats(req,res) {
        var adminId = req.params.adminId;

                    RecruiterModel
                        .findAllRecruiters()
                        .then(function (allRecruiters) {

                            if(allRecruiters == null){
                                res.send(500).send('Internal Server Error')
                            }

                            var countRecruiter = allRecruiters.length;

                            UserModel
                                .findAllUsers()
                                .then(function (allUsers) {

                                    if(allUsers == null){
                                        res.send(500).send('Internal Server Error')
                                    }

                                    var countUsers = allUsers.length;
                                    var countMessages = 0;

                                    var stat = {
                                        'userCount':countUsers,
                                        'recruiterCount':countRecruiter,
                                        'newMessageCount':countMessages
                                    }


                                    res.json(stat)

                                },function(err){
                                    res.send(err)
                                });
                        });
    }



    function findAllUsers(req,res) {


        var adminId = req.params.adminId;
        var newParams = req.query;

        var dataRequire = newParams['data'];

                    if(dataRequire == -1) {


                        UserModel
                            .findAllUsers()
                            .then(function (allUsers) {

                                if (allUsers == null) {
                                    res.send(500).send('Internal Server Error')
                                }
                                res.send(allUsers)
                            });

                    }
                    else if(dataRequire == 'blocked') {
                        UserModel
                            .findBlockedUsers()
                            .then(function (blockedUsers) {

                                if(blockedUsers == null)
                                {
                                    res.send(500).send('internal server error')
                                }

                                res.send(blockedUsers)

                            },function (err) {
                                res.send(err);
                            });
                    }
                    else if(dataRequire == 'unblocked'){

                        UserModel
                            .findUnBlockedUsers()
                            .then(function (unblockedUsers) {

                                if(unblockedUsers == null)
                                {
                                    res.send(500).send('internal server error')
                                }

                                res.send(unblockedUsers)

                            },function (err) {
                                res.send(err);
                            });
                    }
    }

    function findAllRecruiters(req,res) {

        var adminId = req.params.adminId;
        var newParams = req.query;
        var dataRequire = newParams['data'];

                    if(dataRequire == -1) {


                        RecruiterModel
                            .findAllRecruiters()
                            .then(function (allRecruiters) {


                                if(allRecruiters == null) {
                                    res.send(500).send('internal server error')
                                }
                                res.send(allRecruiters)

                            },function (err) {
                                res.send(err);
                            })
                    }
                    else if(dataRequire == 'blocked') {
                        RecruiterModel
                            .findBlockedRecruiters()
                            .then(function (blockedRecruiters) {

                                if(blockedRecruiters == null)
                                {
                                    res.send(500).send('internal server error')
                                }

                                res.send(blockedRecruiters)

                            },function (err) {
                                res.send(err);
                            });
                    }
                    else if(dataRequire == 'unblocked'){

                        RecruiterModel
                            .findUnBlockedRecruiters()
                            .then(function (unblockedRecruiters) {

                                if(unblockedRecruiters == null)
                                {
                                    res.send(500).send('internal server error')
                                }

                                res.send(unblockedRecruiters)

                            },function (err) {
                                res.send(err);
                            });
                    }
                }




}