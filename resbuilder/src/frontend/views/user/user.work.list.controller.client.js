
(function () {

    angular
        .module("ResumeBuilder")
        .controller("WorkExpController", WorkExpController);

    function WorkExpController($location, $routeParams, WorkExpService, UserService) {
        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            vm.userId = $routeParams['uid'];
            vm.error = null;
            vm.workExpList = null;

            vm.createWorkExp = createWorkExp;
            vm.deleteWorkExp = deleteWorkExp;
            vm.logout = logout;

            findWorkExpForUser(vm.userId);
        }


        init();


        function logout() {

            var promise = UserService.logout(vm.userId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }



        function findWorkExpForUser(userId) {
            var promise = WorkExpService.findWorkExpForUser(userId);
            promise.success(onFindWorkExpForUserSuccess);
            promise.error(onFindWorkExpForUserError);
        }



        /*
         * Add work experience for user.
         */
        function createWorkExp(workexp) {

            var newWorkExp = angular.copy(workexp);

            newWorkExp.technologies = [];

            for(var w in workexp.technologies){
                newWorkExp.technologies.push(workexp.technologies[w].text);
            }
            newWorkExp.userId = vm.userId;

            var promise = WorkExpService.createWorkExp(newWorkExp);

            promise.success(onCreateWorkExpSuccess);
            promise.error(onCreateWorkExpError);
        }



        /*
         * Delete the work experience.
         */
        function deleteWorkExp(workexpId) {
            var promise = WorkExpService.deleteWorkExp(workexpId);
            promise.success(onDeleteWorkExpSuccess);
            promise.error(onDeleteWorkExpError);
        }



        /*
         * promise handlers.
         */

        function onFindWorkExpForUserSuccess(response) {
            vm.workExpList = response;
        }

        function onFindWorkExpForUserError(error) {
            vm.error = "Could not fetch work experience. Error: " + error;
            if(error == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        /*
         * update list on success.
         */
        function onCreateWorkExpSuccess(response) {
            findWorkExpForUser(vm.userId);
            vm.workexp = null;
        }

        function onCreateWorkExpError(err) {
            vm.error = "Could not add work experience. Try after sometime. Error: " + err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function onDeleteWorkExpSuccess(response) {
            findWorkExpForUser(vm.userId);
        }

        function onDeleteWorkExpError(err) {
            vm.error = "Could not delete. Try after sometime. Error: " + err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
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
    }
})();