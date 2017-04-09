(function() {
    angular
        .module("ResumeBuilder")
        .factory("AdminService", AdminService);

    var ADMIN_SERVICE_URL = "/api/admin";


    function AdminService($http) {


        var api = {
            "fetchStats":fetchStats
        };

        return api;

        function fetchStats(adminId)
        {
            var fetchStatsUrl = ADMIN_SERVICE_URL + "/" + adminId + "/stats";
            return $http.get(fetchStatsUrl);
        }

    }
})();