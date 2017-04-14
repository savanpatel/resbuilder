/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminManageRecruiterController", AdminManageRecruiterController);

    function AdminManageRecruiterController($location, $routeParams, AdminService, PagerService, MessageService) {

        var vm = this;

        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.userType = "recruiter";
            vm.isCollapsed = false;
            vm.error = null;


            vm.aid = $routeParams['aid'];
            vm.deleteByAdmin = deleteByAdmin;
            vm.logout = logout;
            vm.update = update;

            fetchRecruitersInfo(vm.aid);
            fetchNewMessageCount(vm.aid);

        }


        /*
         *  Fetches recruiters info.
         */
        function fetchRecruitersInfo(adminId) {
            var promise = AdminService.getAllRecruiters(adminId);

            promise.success(onFetchRecruitersSuccess);
            promise.error(onFetchRecruitersError);
        }



        /*
         * Fetches new message count for admin.
         */
        function fetchNewMessageCount(adminId) {
            var promise = MessageService.getNewMessageCountByReceiverId(adminId);

            promise.success(onGetNewMessageCountSuccess);
            promise.error(onGetNewMessageCountError);
        }


        /*
         * Delete
         */
        function deleteByAdmin(rid) {

            var promise = AdminService.deleteRecruiterByAdmin(vm.aid, rid);

            promise
                .success(onDeleteRecruiterByAdminSuccess)
                .error(onDeleteRecruiterByAdminError)
            
        }


        function onDeleteRecruiterByAdminError() {
            console.log("unsuccessful delete")
        }
        
        function onDeleteRecruiterByAdminSuccess() {

            var promise = AdminService.getAllRecruiters(vm.aid);

            promise
                .success(onFetchRecruitersSuccess)
                .error(onFetchRecruitersError)
            
        }

        function update(user) {

            var promise = AdminService.updateRecruiterByAdmin(vm.aid,user);

            promise
                .success(onUpdateRecruiterByAdminSuccess)
                .error(onUpdateRecruiterByAdminError)
        }

        function onUpdateRecruiterByAdminSuccess() {
            console.log("updated")

        }

        function onUpdateRecruiterByAdminError() {
            console.log("unSuccessful Update");

        }

        function onFetchRecruitersSuccess(recruiters) {
            vm.dummyItems = recruiters;

            vm.pager = {};
            vm.setPage = setPage;
            initController();
        }

        function onFetchRecruitersError(err) {
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



        /*ends the session.*/
        function logout() {

            var promise = AdminService.logout(vm.aid);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }


        function onLogoutSuccess(response) {
            $location.url("/");
        }

        function onLogoutError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            } else{
                $location.url("/");
            }
        }



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
