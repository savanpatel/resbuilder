(function() {
    angular
        .module("ResumeBuilder")
        .factory("ResumeDataService", ResumeDataService);

    var RESUME_DATA_SERVICE_URL = "/api/getResumeData";

    function ResumeDataService($http) {


        var api = {
            "getResumeData": getResumeData,
            "setUrl" : setUrl,
            "getUrl":getUrl,
            "getResumePDF":getResumePDF
        };

        return api

        this.jobDesURl = "";

        function getResumeData(uid, url) {
            var getResumeDataUrl = RESUME_DATA_SERVICE_URL + "/" + uid + "?url=" + url;
            return $http.get(getResumeDataUrl);
        }

        function setUrl(url) {
            this.jobDesURl = url;
        }

        function getUrl() {
            return this.jobDesURl;
        }


        function getResumePDF(uid,data) {
            var url = RESUME_DATA_SERVICE_URL + "/" + uid;
            return $http.post(url, data);
        }

    }
})();
    
    