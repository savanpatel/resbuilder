(function() {
    angular
        .module("ResumeBuilder")
        .factory("WorkExpService", WorkExpService);

    var USER_SERVICE_URL = "/api/workexp";


    function WorkExpService($http) {


        var api = {
            "createWorkExp": createWorkExp
        };

        return api;


        /*
         * creates new user, returns promise.
         *
         */

        function createWorkExp(workexp)
        {
            var createWorkExpUrl = USER_SERVICE_URL;
            return $http.post(createWorkExpUrl, workexp);
        }



        /*
         * Finds user by userid, returns promise.
         *
         */
        function findUserById(id) {

            var findUserByIdUrl = USER_SERVICE_URL + "/" + id;
            return $http.get(findUserByIdUrl);
        }



        /*
         * Finds user by username, returns promise.
         *
         */
        function findUserByUsername(username){
            var findUserUrl = USER_SERVICE_URL + "?username="+username;
            return $http.get(findUserUrl);
        }


        /*
         * returns promise.
         *
         */
        function findUserByCredentials(username, password){

            var getRequestUrl =
                USER_SERVICE_URL + "?username=" + username + "&password="+password;
            return $http.get(getRequestUrl);
        }


        /*
         * Updates the user with the new user information provided.
         * Returns  promise.
         */
        function updateUser(userId, user) {
            var putRequestUrl = USER_SERVICE_URL + "/" + user._id;
            return $http.put(putRequestUrl, user);
        }




        /*
         *
         *  Deletes the user from the list.
         *  returns promise.
         */
        function deleteUser(userId) {

            var deleteUserUrl = USER_SERVICE_URL + "/" + userId;
            return $http.delete(deleteUserUrl);
        }


        function checkUsernameAvailable(username) {
            var checkUsernameAvail = USER_SERVICE_URL + "/" + "username/" + username;
            return $http.get(checkUsernameAvail);
        }
    }
})();