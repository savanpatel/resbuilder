(function() {
    angular
        .module("ResumeBuilder")
        .factory("AdminService", AdminService);

    var ADMIN_SERVICE_URL = "/api/admin";


    function AdminService($http) {


        var api = {
            "fetchStats":fetchStats,
            "getAllUsers":getAllUsers,
            "getAllRecruiters":getAllRecruiters,
            "updateUserByAdmin":updateUserByAdmin,
            "updateRecruiterByAdmin":updateRecruiterByAdmin,
            "deleteUserByAdmin":deleteUserByAdmin,
            "deleteRecruiterByAdmin":deleteRecruiterByAdmin,
            "getAdminInfo": getAdminInfo,
            "logout":logout
        };

        return api;



        function deleteRecruiterByAdmin(adminId, recruiterId) {
            return $http.delete("api/admin/" + adminId + "/recruiter/" + recruiterId);
        }

        function deleteUserByAdmin(adminId, userId) {
            return $http.delete("api/admin/" + adminId + "/user/" + userId);
        }


        /*fetch all recruiters*/
        function getAllRecruiters(adminId) {
            return $http.get("/api/admin/" + adminId +"/recruiters?data=-1")

        }

        function updateUserByAdmin(adminId,user) {
            return $http.put("/api/admin/"+adminId+"/user",user);
        }


        function updateRecruiterByAdmin(adminId,user) {
            return $http.put("/api/admin/" + adminId + "/recruiter",user);
        }


        function fetchStats(adminId) {
            var fetchStatsUrl = ADMIN_SERVICE_URL + "/" + adminId + "/stats";
            return $http.get(fetchStatsUrl);
        }
        function getAllUsers(adminId) {

            return $http.get("/api/admin/" + adminId +"/users?data=-1")
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