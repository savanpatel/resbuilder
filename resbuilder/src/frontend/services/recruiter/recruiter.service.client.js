(function() {
    angular
        .module("ResumeBuilder")
        .factory("RecruiterService", RecruiterService);

    var RECRUITER_SERVICE_URL = "/api/recruiter";


    function RecruiterService($http) {


        var api = {
            "createRecruiter": createRecruiter,
            "findRecruiterById": findRecruiterById,
            "findRecruiterByUsername": findRecruiterByUsername,
            "findRecruiterByCredentials": findRecruiterByCredentials,
            "updateRecruiter": updateRecruiter,
            "deleteRecruiter": deleteRecruiter,
            "checkUsernameAvailable":checkUsernameAvailable,
            "findUsersBySkill":findUsersBySkill,
            "updateRecruiterPassword":updateRecruiterPassword,
            "logout":logout
        };

        return api;

        function createRecruiter(recruiter)
        {
            var createRecruiterUrl = RECRUITER_SERVICE_URL;
            return $http.post(createRecruiterUrl, recruiter);
        }



        /*
         * Finds recruiter by id, returns promise.
         *
         */
        function findRecruiterById(id) {

            var findRecruiterByIdUrl = RECRUITER_SERVICE_URL + "/" + id;
            return $http.get(findRecruiterByIdUrl);
        }



        /*
         * Finds user by username, returns promise.
         *
         */
        function findRecruiterByUsername(username){
            var findRecruiterUrl = RECRUITER_SERVICE_URL + "?username="+username;
            return $http.get(findRecruiterUrl);
        }


        /*
         * returns promise.
         *
         */
        function findRecruiterByCredentials(username, password){

            var reqBody = {
                username:username,
                password:password,
                isRecruiter: true
            };
            var postRequestUrl = RECRUITER_SERVICE_URL + "/login";
            return $http.post(postRequestUrl, reqBody);
        }


        /*
         * Updates the user with the new user information provided.
         * Returns  promise.
         */
        function updateRecruiter(recruiter) {
            var updateRecruiterUrl = RECRUITER_SERVICE_URL + "/" + recruiter._id;
            return $http.put(updateRecruiterUrl, recruiter);
        }




        /*
         *
         *  Deletes the user from the list.
         *  returns promise.
         */
        function deleteRecruiter(recruiterId) {

            var deleteRecruiterUrl = RECRUITER_SERVICE_URL + "/" + recruiterId;
            return $http.delete(deleteRecruiterUrl);
        }


        function checkUsernameAvailable(username) {
            var checkUsernameAvail = RECRUITER_SERVICE_URL + "/" + "username/" + username;
            return $http.get(checkUsernameAvail);
        }



        /*Searches for users by skills*/
        function findUsersBySkill(recruiterId, skill) {
            var findUsersBySkillUrl = RECRUITER_SERVICE_URL + "/" + recruiterId + "/user/skill?skills=" + skill;
            return $http.get(findUsersBySkillUrl);
        }


        function logout(recruiterId) {
            var logoutUrl = RECRUITER_SERVICE_URL + "/" + recruiterId + "/logout";
            return $http.get(logoutUrl);
        }


        function updateRecruiterPassword(recruiterId, passwordInfo) {
            var updateRecruiterPasswordUrl = RECRUITER_SERVICE_URL + "/" + recruiterId + "/updatepassword";
            return $http.put(updateRecruiterPasswordUrl, passwordInfo);
        }
    }
})();