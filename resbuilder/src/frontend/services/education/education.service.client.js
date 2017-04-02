(function() {
    angular
        .module("ResumeBuilder")
        .factory("EducationService", EducationService);

    var EDUCATION_SERVICE_URL = "/api/education";


    function EducationService($http) {


        var api = {
            "createEducation": createEducation,
            "findEducationForUser": findEducationForUser,
            "deleteEducation":deleteEducation,
            "updateEducation":updateEducation,
            "findEducationById": findEducationById
        };

        return api;


        /*
         * creates new user, returns promise.
         *
         */
        function createEducation(education)
        {
            var createEducationUrl = EDUCATION_SERVICE_URL;
            return $http.post(createEducationUrl, education);
        }



        /*
         * finds education for the user.
         */
        function findEducationForUser(userId) {
            var findEducationUrl = EDUCATION_SERVICE_URL + "/user/" + userId;
            return $http.get(findEducationUrl);
        }



        /*
         * delete education.
         */
        function deleteEducation(educationId) {
            var deleteEducationUrl = EDUCATION_SERVICE_URL + "/" + educationId;
            return $http.delete(deleteEducationUrl);
        }



        /*
         * update education.
         */
        function updateEducation(education, educationId) {
            var updateEducationUrl = EDUCATION_SERVICE_URL + "/" + educationId;
            return $http.put(updateEducationUrl, education);
        }



        /*
         * find education by id.
         */
        function findEducationById(educationId) {
            var findEducationByIdUrl = EDUCATION_SERVICE_URL + "/" + educationId;
            return $http.get(findEducationByIdUrl);
        }
    }
})();