(function() {
    angular
        .module("ResumeBuilder")
        .factory("AdminService", AdminService);

    var ADMIN_SERVICE_URL = "/api/admin";


    function AdminService($http) {


        var api = {
            "fetchStats":fetchStats,
            "getAdminInfo": getAdminInfo,
            "logout":logout
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


        function logout(adminId) {
            var logoutUrl = ADMIN_SERVICE_URL + "/" + adminId + "/logout";
            return $http.get(logoutUrl);
        }

    }
})();