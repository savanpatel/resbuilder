/**
 * Created by panktibhalani on 4/4/17.
 */

(function() {
    angular
        .module("ResumeBuilder")
        .factory("ResumeDataService", ResumeDataService);

    var TECHNICALSKILL_SERVICE_URL = "/api/getResumeData"

    function ResumeDataService($http) {

        var api = {
            "getResumeData": getResumeData
        };

        return api

        function getResumeData(uid) {
            return $http.post("/api/getResumeData/"+uid);
        }
    }
})();
    
    