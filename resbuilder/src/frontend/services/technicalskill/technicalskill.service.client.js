(function() {
    angular
        .module("ResumeBuilder")
        .factory("TechnicalSkillService", TechnicalSkillService);

    var TECHNICALSKILL_SERVICE_URL = "/api/technicalskill";


    function TechnicalSkillService($http) {


        var api = {
            "updateTechnicalSkill": updateTechnicalSkill,
            "findTechnicalSkillForUser": findTechnicalSkillForUser
        };

        return api;


        /*
         * update the technical skills for the user.
         *
         */
        function updateTechnicalSkill(technicalSkill, technicalSkillId) {
            var updateTechnicalSkillUrl = TECHNICALSKILL_SERVICE_URL + "/" + technicalSkillId;
            return $http.put(updateTechnicalSkillUrl, technicalSkill);
        }



        /*
         * Returns the technical skill for the user.
         */
        function findTechnicalSkillForUser(userId) {
            var findTechnicalSkillForUserUrl = TECHNICALSKILL_SERVICE_URL + "/user/" + userId;
            return $http.get(findTechnicalSkillForUserUrl);
        }
    }
})();