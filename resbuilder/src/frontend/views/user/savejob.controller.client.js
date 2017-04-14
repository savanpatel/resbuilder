
(function () {

    angular
        .module("ResumeBuilder")
        .controller("SaveJobController", SaveJobController);

    function SaveJobController($location, $routeParams, UserService, JobService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.userId = $routeParams['uid'];
            vm.uid = $routeParams['uid'];


            vm.savedJobList  = [];
            vm.noJobsMessage = null;

            vm.logout = logout;
            vm.saveJob = saveJob;
            vm.editJob = editJob;
            vm.deleteJob = deleteJob;

            var passedArg = $location.search();

            passedArg.jobUrl;
            if(null != passedArg){
                vm.job = {
                    jobUrl: passedArg.jobUrl,
                    companyName: passedArg.companyName,
                    note: "",
                    userId:vm.uid
                };
            }

            fetchJobForUser(vm.userId);
        }


        init();


        function saveJob(job) {
            var newJob = angular.copy(job);
            newJob.userId = vm.uid;

            var promise = JobService.createJob(newJob);
            promise.success(onCreateJobSuccess);
            promise.error(onCreateJobError);
        }

        function fetchJobForUser(userId) {
            var promise = JobService.findJobForUser(userId);
            promise.success(onFindJobForUserSuccess);
            promise.error(onFindJobForUserError);

        }


        function logout() {

            var promise = UserService.logout(vm.userId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }



        function editJob(jobId) {
            $location.url("/user/" + vm.userId + "/savejob/" + jobId);
        }


        function deleteJob(jobId) {
            var promise = JobService.deleteJob(jobId);
            promise.success(onDeleteJobSuccess);
            promise.error(onDeleteJobError);

        }


        function onFindJobForUserSuccess(response) {
            vm.savedJobList = response;
            if(response.length == 0){
                vm.noJobsMessage = "No Saved Jobs."
            }
        }

        function onFindJobForUserError(err) {
            vm.error = err;
            vm.noJobsMessage = null;
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


        function onCreateJobSuccess(response) {
            vm.job = null;
            fetchJobForUser(vm.userId);

        }

        function onCreateJobError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
            vm.error = err;
        }



        function onDeleteJobSuccess(response) {
            fetchJobForUser(vm.userId);
        }

        function onDeleteJobError(err) {
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
            vm.error = err;
        }
    }
})();