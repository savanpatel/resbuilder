(function() {
    angular
        .module("ResumeBuilder")
        .factory("ResumeService", ResumeService);




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

            console.log("/api/downloadResumePDF/"+resumeId)
            return $http.get("/api/downloadResumePDF/"+resumeId);

        }

        function createResume(resume) {
            return $http.post("/api/resume", resume);
        }




        function updateResume(resume, resumeid) {

            return $http.put("/api/resume/"+resumeid, resume);
        }




        function deleteResume(resumeid) {

            console.log(resumeid);
            var deleteResumeUrl = "/api/resume/" + resumeid;
            return $http.delete(deleteResumeUrl);
        }




        function findResumeforUser(userId) {

            var findResumeListForUserUrl = "/api/resume/user/" + userId;
            console.log(findResumeListForUserUrl)
            console.log(userId)
            return $http.get(findResumeListForUserUrl);
        }



        function findResumeById(resumeid) {
            var findResumeByIdUrl = "/api/resume/" + resumeid;
            return $http.get(findResumeByIdUrl);
        }

    }
})();