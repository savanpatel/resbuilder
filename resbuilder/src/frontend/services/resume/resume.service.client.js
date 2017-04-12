(function() {
    angular
        .module("ResumeBuilder")
        .factory("ResumeService", ResumeService);



    var RESUME_SERVICE_URL = "/api/resume";

    function ResumeService($http) {


        var api = {
            "createResume": createResume,
            "updateResume":updateResume,
            "deleteResume":deleteResume,
            "findResumeforUser":findResumeforUser,
            "findResumeById":findResumeById,
            "downloadResume":downloadResume,
        };

        return api;


        function downloadResume(resumeId) {

            var url = "/api/downloadResumePDF/"+ resumeId;
            return $http.get(url);

        }

        function createResume(resume) {
            var url = RESUME_SERVICE_URL;
            return $http.post(url, resume);
        }


        function updateResume(resume, resumeid) {
            var url = RESUME_SERVICE_URL + "/" + resumeid
            return $http.put(url, resume);
        }




        function deleteResume(resumeid) {

            var deleteResumeUrl = RESUME_SERVICE_URL + "/" + resumeid;
            return $http.delete(deleteResumeUrl);
        }




        function findResumeforUser(userId) {

            var findResumeListForUserUrl = RESUME_SERVICE_URL + "/user/" + userId;
            console.log(findResumeListForUserUrl)
            console.log(userId)
            return $http.get(findResumeListForUserUrl);
        }



        function findResumeById(resumeid) {
            var findResumeByIdUrl = RESUME_SERVICE_URL + "/" + resumeid;
            return $http.get(findResumeByIdUrl);
        }

    }
})();