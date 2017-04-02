(function() {
    angular
        .module("ResumeBuilder")
        .factory("WorkExpService", WorkExpService);

    var WORKEXP_SERVICE_URL = "/api/workexp";


    function WorkExpService($http) {


        var api = {
            "createWorkExp": createWorkExp,
            "findWorkExpForUser":findWorkExpForUser,
            "deleteWorkExp":deleteWorkExp,
            "updateWorkExp":updateWorkExp,
            "findWorkExpById":findWorkExpById
        };

        return api;


        /*
         * creates new user, returns promise.
         *
         */

        function createWorkExp(workexp)
        {
            var createWorkExpUrl = WORKEXP_SERVICE_URL;
            return $http.post(createWorkExpUrl, workexp);
        }



        /*
         * Find workexp for user.
         */
        function findWorkExpForUser(userId) {
            var findWorkExpForUserUrl = WORKEXP_SERVICE_URL + "/user/" + userId;
            return $http.get(findWorkExpForUserUrl);
        }


        /*
         * delete work experience.
         */
        function deleteWorkExp(workexpId) {
            var deleteWorkExpUrl = WORKEXP_SERVICE_URL + "/" + workexpId;
            return $http.delete(deleteWorkExpUrl);
        }


        /*
         * update work experience.
         */
        function updateWorkExp(workexp, workexpId) {
            var updateWorkExpUrl = WORKEXP_SERVICE_URL + "/" + workexpId;
            return $http.put(updateWorkExpUrl, workexp);
        }


        /*
         * find work exp by work exp id.
         */
        function findWorkExpById(workexpId) {
            var findWorkExpByIdUrl = WORKEXP_SERVICE_URL + "/" + workexpId;
            return $http.get(findWorkExpByIdUrl);
        }
    }
})();