/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminManageRecruiterController", AdminManageRecruiterController);

    function AdminManageRecruiterController($location, $routeParams, AdminService, PagerService,UserService) {

        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.userType = "recruiter"
            vm.isCollapsed = false;
            vm.error = null;


            vm.aid = $routeParams['aid'];
            vm.deleteByAdmin = deleteByAdmin;

            vm.update = update;

            var promise = AdminService.getAllRecruiters(vm.aid);

            promise
                .success(renderRecruiters)
                .error(errorWhileRendering)

        }
        
        function deleteByAdmin(rid) {

            var promise = AdminService.deleteRecruiterByAdmin(vm.aid,rid);

            promise
                .success(stateAfterDelete)
                .error(stateAfterUnsuccessfulDelete)
            
        }

        function stateAfterUnsuccessfulDelete() {
            console.log("unsuccessfull delete")
        }
        
        function stateAfterDelete() {

            var promise = AdminService.getAllRecruiters(vm.aid);

            promise
                .success(renderRecruiters)
                .error(errorWhileRendering)
            
        }

        function update(user) {


            var promise = AdminService.updateRecruiterByAdmin(vm.aid,user);

            promise
                .success(updatedSuccesfully)
                .error(unSuccessfulUpdate)
        }

        function updatedSuccesfully() {
            console.log("updated")

        }

        function unSuccessfulUpdate() {
            console.log("unSuccessful Update");

        }

        function renderRecruiters(users) {
            vm.dummyItems = users

            vm.pager = {};
            vm.setPage = setPage;
            initController();
        }

        function errorWhileRendering(err) {
            console.log(err);
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
