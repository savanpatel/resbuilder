module.exports = function (app, mongooseAPI) {

    app.get('/api/admin/:adminId/recruiters',findAllRecruiters);
    app.get('/api/admin/:adminId/users',findAllUsers);
    app.get('/api/admin/:adminId/stats',getAllStats);

    var UserModel = mongooseAPI.userModelAPI;
    var RecruiterModel = mongooseAPI.recruiterModelAPI;
    
    function getAllStats(req,res) {



        var adminId = req.params.adminId;


        var promise = UserModel.isAdmin(adminId);

        promise
            .then(function (isadmin) {
                if(isadmin){


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
                        },function(err){
                        res.send(err)
                    });
                }

            },function(err){
                res.send(err)
            });
    }



    function findAllUsers(req,res) {


        var adminId = req.params.adminId;
        var newParams = req.query;

        var dataRequire = newParams['data'];


        var promise = UserModel.isAdmin(adminId);

        promise
            .then(function (isadmin) {


                if(isadmin) {


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

            },function (err) {
                res.send(500).send('Error User not found');
            });
    }

    function findAllRecruiters(req,res) {

        var adminId = req.params.adminId;
        var newParams = req.query;
        var dataRequire = newParams['data'];
        var promise = UserModel.isAdmin(adminId);

        promise
            .then(function (isadmin) {

                if(isadmin) {


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

            },function (err) {
                res.send(500).send('Error User not found');
            });
    }


}