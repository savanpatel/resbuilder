/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.get("/app/user", findUserByCredentials);
    app.post("/app/user", createUser);


    function findUserByCredentials(req, res) {

    }
}();