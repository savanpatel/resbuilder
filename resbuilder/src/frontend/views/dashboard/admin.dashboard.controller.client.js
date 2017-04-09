/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminDashBoardController", AdminDashBoardController);

    function AdminDashBoardController($location, $routeParams, AdminService) {

        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.error = null;

            vm.aid = $routeParams['aid'];

           // fetchStats();
        }


        init();


        /*
         * Fetch the stats for admin like usercount, new messages, recruiter count etc.
         */
        function fetchStats() {

            var promise = AdminService.fetchStats();
            promise.success(onFetchStatsSuccess);
        }




        /*Promise handlers*/
        function onFetchStatsSuccess(response) {
            vm.userStats = response;
        }

        function onFetchStatsError(err) {
            vm.error = err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



    }
})();
