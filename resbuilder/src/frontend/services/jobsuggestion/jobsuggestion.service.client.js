(function() {
    angular
        .module("ResumeBuilder")
        .factory("JobSuggestionService", JobSuggestionService);

    var JOBSUGGESTION_SERVICE_URL = "https://jobs.github.com/positions.json?";


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
            var skillString = skills.join(',');
            var findJobUrl = JOBSUGGESTION_SERVICE_URL + "description=" + skills;
            return $http.get(findJobUrl);
        }
    }
})();