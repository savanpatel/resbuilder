(function() {
    angular
        .module("ResumeBuilder")
        .factory("JobSuggestionService", JobSuggestionService);

    var JOBSUGGESTION_SERVICE_URL = "/api/job/suggest";


    function JobSuggestionService($http) {


        var api = {
            "findJob": findJob
        };

        return api;


        /*
         * creates new user, returns promise.
         * params: array of skills.
         *
         */
        function findJob(skills)
        {
            var findJobUrl = JOBSUGGESTION_SERVICE_URL + "/" + skills[0];
            return $http.get(findJobUrl);
        }
    }
})();