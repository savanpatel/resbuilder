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
            "updateUserPassword":updateUserPassword,
            "updateRecruiterPassword":updateRecruiterPassword,
            "updateRecruiterByAdmin":updateRecruiterByAdmin,
            "deleteUserByAdmin":deleteUserByAdmin,
            "deleteRecruiterByAdmin":deleteRecruiterByAdmin,
            "getAdminInfo": getAdminInfo,
            "logout":logout
        };

        return api;

        function updateRecruiterPassword(adminId,userId,newpassword) {
            var jsonIn = {
                "newPass": newpassword
            }

            var url = ADMIN_SERVICE_URL + "/" + adminId + "/recruiter/" + userId;
            return $http.put(url,jsonIn);
        }


        function updateUserPassword(adminId,userId,newpassword) {
            var jsonIn = {
                "newPass": newpassword
            }
            var url = ADMIN_SERVICE_URL + "/" + adminId + "/user/" + userId;
            return $http.put(url,jsonIn);
        }

        function deleteRecruiterByAdmin(adminId, recruiterId) {
            var url = ADMIN_SERVICE_URL + "/" + adminId + "/recruiter/" + recruiterId;
            return $http.delete(url);
        }

        function deleteUserByAdmin(adminId, userId) {
            var url = ADMIN_SERVICE_URL + "/" + adminId + "/user/" + userId;
            return $http.delete(url);
        }


        /*fetch all recruiters*/
        function getAllRecruiters(adminId) {
            var url = ADMIN_SERVICE_URL + "/" + adminId +"/recruiters?data=-1";
            return $http.get(url)

        }

        function updateUserByAdmin(adminId, user) {
            var url = ADMIN_SERVICE_URL + "/" + adminId + "/user";
            return $http.put(url , user);
        }


        function updateRecruiterByAdmin(adminId, recruiter) {
            var url = ADMIN_SERVICE_URL + "/" + adminId + "/recruiter";
            return $http.put(url, recruiter);
        }


        function fetchStats(adminId) {
            var fetchStatsUrl = ADMIN_SERVICE_URL + "/" + adminId + "/stats";
            return $http.get(fetchStatsUrl);
        }
        function getAllUsers(adminId) {

            var url = ADMIN_SERVICE_URL + "/" + adminId +"/users?data=-1";
            return $http.get(url);
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