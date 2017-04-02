
(function () {

    angular
        .module("ResumeBuilder")
        .controller("WorkExpController", WorkExpController);

    function WorkExpController($scope, $location, $routeParams, WorkExpService) {
        var vm = this;
        function init() {
            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            vm.userId = $routeParams['uid'];
            vm.error = null;
            vm.workExpList = null;

            vm.createWorkExp = createWorkExp;
            vm.deleteWorkExp = deleteWorkExp;

            findWorkExpForUser(vm.userId);


        }


        init();



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
        }


        /*
         * update list on success.
         */
        function onCreateWorkExpSuccess(response) {
            findWorkExpForUser(vm.userId);
        }

        function onCreateWorkExpError(err) {
            vm.error = "Could not add work experience. Try after sometime. Error: " + err;
        }


        function onDeleteWorkExpSuccess(response) {
            findWorkExpForUser(vm.userId);
        }

        function onDeleteWorkExpError(err) {
            vm.error = "Could not delete. Try after sometime. Error: " + err;
        }
    }
})();