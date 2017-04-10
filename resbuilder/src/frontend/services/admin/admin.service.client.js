(function() {
    angular
        .module("ResumeBuilder")
        .factory("AdminService", AdminService);

    var ADMIN_SERVICE_URL = "/api/admin";


    function AdminService($http) {


        var api = {
            "fetchStats":fetchStats,
            "getAdminInfo": getAdminInfo
        };

        return api;

        function fetchStats(adminId)
        {
            var fetchStatsUrl = ADMIN_SERVICE_URL + "/" + adminId + "/stats";
            return $http.get(fetchStatsUrl);
        }



        function getAdminInfo() {
            var getAdminInfoUrl = ADMIN_SERVICE_URL;
            return $http.get(getAdminInfoUrl);
        }

    }
})();