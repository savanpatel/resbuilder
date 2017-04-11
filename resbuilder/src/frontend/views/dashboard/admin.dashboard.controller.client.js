/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminDashBoardController", AdminDashBoardController);

    function AdminDashBoardController($location, $routeParams, AdminService, MessageService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.error = null;

            vm.aid = $routeParams['aid'];
            vm.userStats = {
                userCount:0,
                recruiterCount:0,
                newMessageCount:0
            };

            vm.logout = logout;

           fetchStats(vm.aid);
        }


        init();



        function logout() {

            var promise = AdminService.logout(vm.aid);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }

        /*
         * Fetch the stats for admin like usercount, new messages, recruiter count etc.
         */
        function fetchStats(adminId) {

            var promise = AdminService.fetchStats(adminId);
            promise.success(onFetchStatsSuccess);
            promise.error(onFetchStatsError);

            var promise2 = MessageService.getNewMessageCountByReceiverId(adminId);

            promise2.success(onGetNewMessageCountSuccess);
            promise2.error(onGetNewMessageCountError);

        }


        /*Promise handlers*/
        function onGetNewMessageCountSuccess(response) {
            console.log(response);
            vm.userStats.newMessageCount = response.newMessageCount;
        }

        function onGetNewMessageCountError(err) {
            vm.error = "Could not fetch message count. " + err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }
        function onFetchStatsSuccess(response) {

            console.log(response)
            vm.userStats.recruiterCount = response.recruiterCount;
            vm.userStats.userCount = response.userCount;
        }

        function onFetchStatsError(err) {
            vm.error = err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



        function onLogoutSuccess(response) {
            $location.url("/admin/login");
        }

        function onLogoutError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            } else{
                $location.url("/admin/login");
            }
        }
    }
})();
