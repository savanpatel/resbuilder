/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminManageUserController", AdminManageUserController);

    function AdminManageUserController($location, $routeParams, AdminService, PagerService, MessageService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.userType = "user"
            vm.isCollapsed = false;
            vm.error = null;

            vm.deleteByAdmin = deleteByAdmin;


            vm.aid = $routeParams['aid'];

            vm.update = update;

            var promise = AdminService.getAllUsers(vm.aid);

            promise
                .success(renderUsers)
                .error(errorWhileRendering);

            fetchNewMessageCount(vm.aid);

        }

        function fetchNewMessageCount(adminId) {
            var promise = MessageService.getNewMessageCountByReceiverId(adminId);

            promise.success(onGetNewMessageCountSuccess);
            promise.error(onGetNewMessageCountError);
        }

        function deleteByAdmin(uid) {


            var promise = AdminService.deleteUserByAdmin(vm.aid,uid);

            promise
                .success(stateAfterDelete)
                .error(stateAfterUnsuccessfulDelete)
            
        }

        function stateAfterDelete() {

            var promise = AdminService.getAllUsers(vm.aid);

            promise
                .success(renderUsers)
                .error(errorWhileRendering)

        }

        function stateAfterUnsuccessfulDelete() {

            vm.error="unsuccessful delete"


        }

        function update(user) {


            var promise = AdminService.updateUserByAdmin(vm.aid,user);

            promise
                .success(updatedSuccesfully)
                .error(unSuccessfulUpdate)
        }

        function updatedSuccesfully() {
            vm.error = "updated"

        }

        function unSuccessfulUpdate() {
            vm.error = "unsuccessfull update"
        }

        function renderUsers(users) {
            vm.dummyItems = users

            vm.pager = {};
            vm.setPage = setPage;
            vm.logout = logout;

            initController();
        }

        function errorWhileRendering(err) {
            vm.error="error while rendering"
        }

        init();

        function logout() {

            var promise = AdminService.logout(vm.aid);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }


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

        function onLogoutSuccess(response) {
            $location.url("/");
        }

        function onLogoutError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            } else{
                $location.url("/admin/login");
            }
        }

        /*Promise handlers*/
        function onGetNewMessageCountSuccess(response) {
            vm.newMessageCount = response.newMessageCount;
        }

        function onGetNewMessageCountError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }
    }
})();
