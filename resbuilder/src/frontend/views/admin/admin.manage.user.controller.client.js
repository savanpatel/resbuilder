/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminManageUserController", AdminManageUserController);

    function AdminManageUserController($location, $routeParams, AdminService, PagerService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.error = null;


            vm.aid = $routeParams['aid'];


            vm.dummyItems = []; // dummy array of items to be paged
            for(var i =0; i < 150; i++){
                vm.dummyItems.push(i);
            }
            vm.pager = {};
            vm.setPage = setPage;
            initController();
        }

        init();

        function setPage(page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }

            // get pager object from service
            vm.pager = PagerService.GetPager(vm.dummyItems.length, page);

            // get current page of items
            vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }



        function initController() {
            // initialize to page 1
            vm.setPage(1);
        }

    }
})();
