
(function () {

    angular
        .module("ResumeBuilder")
        .controller("EditWorkExpController", EditWorkExpController);

    function EditWorkExpController($location, $routeParams, WorkExpService) {
        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";


        function init() {
            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            vm.userId = $routeParams['uid'];

            vm.workexpId = $routeParams['wid'];


            findWorkExpById(vm.workexpId);
            vm.updateWorkExp = updateWorkExp;
        }


        init();


        function findWorkExpById(workexpId) {
            console.log(workexpId);
            var promise = WorkExpService.findWorkExpById(workexpId);
            promise.success(onFindWorkExpByIdSuccess);
            promise.error(onFindWorkExpByIdError);
        }


        function updateWorkExp(workexp) {

            var updatedWorkExp = angular.copy(workexp);

            updatedWorkExp.technologies = [];

            for(var t in workexp.technologies){
                updatedWorkExp.technologies.push(workexp.technologies[t].text);
            }

            updatedWorkExp.userId = vm.userId;
            var promise = WorkExpService.updateWorkExp(updatedWorkExp, vm.workexpId);

            promise.success(onUpdateWorkExpSuccess);
            promise.error(onUpdateWorkExpError);

        }

        /*
         * promise handlers.
         */
        function onFindWorkExpByIdSuccess(response) {
            vm.workexp = response;
        }

        function onFindWorkExpByIdError(err) {
            vm.error = "Could not fetch work experience. Error: " + err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }

        function onUpdateWorkExpSuccess(resposne) {
            $location.url("/user/" + vm.userId + "/workexp");
        }

        function onUpdateWorkExpError(err) {
            vm.error = "Could not update work experience. Try after sometime. Error:" + err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }
    }
})();