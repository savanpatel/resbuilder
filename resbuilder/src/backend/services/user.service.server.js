/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);



    var UserModel = mongooseAPI.userModelAPI;

    
    
    
    /*
     *  Handlers
     */

    
    

    /*
     * Handler for POST call /api/user
     */
    function createUser(req, res) {

        var user = req.body;

        if(null == user){
            req.sendStatus(500).send("null/empty user");
            return;
        }


        // create user in db.
        UserModel.createUser(user)
            .then(function (dbUser){

                if(null == dbUser){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbUser);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
        
    }
    
    

    /*
     *
     * Handler for GET call to /api/user
     *
     */
    function findUserByCredentials(req, res) {

        var queryParams = req.query;

        var username = queryParams.username;
        var password = queryParams.password;

        if(null == username || null == password ||
           "" == username || "" == password){
            res.sendStatus(500).send("null/empty username or password");
            return;
        }

        UserModel
            .findUserByCreadentials(username, password)
            .then(function (user) {

                if(null == user) {
                    // user not found in db.
                    res.sendStatus(404).send("User not found.");
                } else {
                    res.send(user);
                }

            }, function (err) {
                // error on database side.
                res.sendStatus(404).send(err);
            });
    }



    /*
     *
     * Handler for find user by user id.
     *
     */
    function findUserById(req, res) {

        var userId = req.params.userId;

        if(userId == null){
            res.sendStatus(500).send("null userId.");
            return;
        }

        UserModel.findUserById(userId)
            .then(function (user) {

                if(null == user){
                    // user not found
                    res.send(404);
                }else {
                    // user found.
                    res.send(user);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }




    /*
     *
     * Handler for update user PUT call.
     */
    function updateUser(req, res) {

        var user = req.body;
        var userId = req.params.userId;

        if(null == user){
            res.sendStatus(500).send("null/empty user for update.");
            return;
        }

        UserModel.updateUser(userId, user)
            .then(function (dbUser) {

                if(null == dbUser){
                    res.sendStatus(500).send("Could not update user.");
                } else {
                    res.send(user);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });

    }




    /*
     * Handler for delete user DELETE call.
     */
    function deleteUser(req, res) {

        var userId = req.params.userId;

        if(null == userId){
            res.sendStatus(404);
            return;
        }

        UserModel.deleteUser(userId)
            .then(function (status) {
                res.sendStatus(status);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}