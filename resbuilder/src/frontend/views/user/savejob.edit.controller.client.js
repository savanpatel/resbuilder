
(function () {

    angular
        .module("ResumeBuilder")
        .controller("SaveJobEditController", SaveJobEditController);

    function SaveJobEditController($location, $routeParams, UserService, JobService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.userId = $routeParams['uid'];
            vm.uid = $routeParams['uid'];
            vm.savedJobId = $routeParams['jid'];
            vm.logout = logout;

            vm.updateJob = updateJob;

            findJobById(vm.savedJobId);
        }


        init();


        function findJobById(jobId) {

            var promise = JobService.findJobById(jobId);
            promise.success(onFindJobByIdSuccess);
            promise.error(onFindJobByIdError);
        }


        function logout() {

            var promise = UserService.logout(vm.userId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }



        function updateJob(job) {
            var updatedJob = angular.copy(job);
            console.log(updatedJob);
            var promise = JobService.updateJob(vm.savedJobId, updatedJob);

            promise.success(onUpdateJobSuccess);
            promise.error(onUpdateJobError);
        }



        /*promise handlers*/
        function onFindJobByIdSuccess(response) {
            vm.job = response;
        }

        function onFindJobByIdError(err) {
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
            vm.error = err;
        }


        function onUpdateJobSuccess(response) {
            $location.url("/user/" + vm.uid + "/savejob");
        }

        function onUpdateJobError(err) {
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            } else {
                vm.error = err;
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