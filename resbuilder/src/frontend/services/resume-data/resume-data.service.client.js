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
            "getResumeData": getResumeData,
            "setUrl" : setUrl,
            "getUrl":getUrl,
            "getResumePDF":getResumePDF
        };

        return api

        this.jobDesURl = "";
        function getResumeData(uid,url) {
            return $http.get("/api/getResumeData/"+uid+"/?url="+url);
        }
        function setUrl(url) {
            this.jobDesURl = url;
        }
        function getUrl() {
            return this.jobDesURl;
        }
        function getResumePDF(uid,data) {
            console.log("In client Service")
            console.log(data)
            return $http.post("/api/generateResume/"+uid,data);
        }

    }
})();
    
    