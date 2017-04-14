(function() {
    angular
        .module("ResumeBuilder")
        .factory("JobService", JobService);

    var JOB_SERVICE_URL = "/api/job";


    function JobService($http) {


        var api = {
            "createJob":createJob,
            "findJobById":findJobById,
            "findJobForUser":findJobForUser,
            "updateJob":updateJob,
            "deleteJob":deleteJob
        };

        return api;


        function createJob(job) {
            var createJobUrl = JOB_SERVICE_URL;
            return $http.post(createJobUrl, job);
        }



        function findJobById(jobId) {
            var findJobByIdUrl = JOB_SERVICE_URL + "/" + jobId;
            return $http.get(findJobByIdUrl);
        }



        function findJobForUser(userId) {
            var findJobForUserUrl = JOB_SERVICE_URL + "/user/" + userId;
            return $http.get(findJobForUserUrl);
        }



        function updateJob(jobId, job) {
            var updateJobUrl = JOB_SERVICE_URL + "/" + jobId;
            return $http.put(updateJobUrl, job);
        }



        function deleteJob(jobId, job) {
            var deleteJobUrl = JOB_SERVICE_URL + "/" + jobId;
            return $http.delete(deleteJobUrl);
        }
    }
})();