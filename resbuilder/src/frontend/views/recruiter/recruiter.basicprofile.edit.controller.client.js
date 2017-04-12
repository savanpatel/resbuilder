
(function () {

    angular
        .module("ResumeBuilder")
        .controller("RecruiterBasicProfileEditController", RecruiterBasicProfileEditController);

    function RecruiterBasicProfileEditController($location, $routeParams, RecruiterService) {
        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.recruiterId = $routeParams['rid'];
            vm.rid = $routeParams['rid'];

            vm.updateRecruiter = updateRecruiter;
            vm.logout = logout;
            vm.updateRecruiterPassword = updateRecruiterPassword;

            var promise = RecruiterService.findRecruiterById(vm.recruiterId);
            promise.success(onFindRecruiterByIdSuccess);
            promise.error(onFindRecruiterByIdError);
        }

        init();



        function updateRecruiterPassword(passwordInfo) {
            var promise = RecruiterService.updateRecruiterPassword(vm.recruiterId, passwordInfo);
            promise.success(onUpdateRecruiterPasswordSuccess);
            promise.error(onUpdateRecruiterPasswordError);

        }

        function logout() {

            var promise = RecruiterService.logout(vm.recruiterId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }

        function updateRecruiter(recruiter) {
            vm.error = null;
            var promise = RecruiterService.updateRecruiter(recruiter);
            promise.success(onUpdateSuccess);
            promise.error(onUpdateError);
        }


        /*---- Promise functions*/
        function onFindRecruiterByIdSuccess(response) {

            vm.recruiter = response;
        }

        function onFindRecruiterByIdError(err) {
            vm.error = "Could not fetch data. Try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



        function onUpdateSuccess(response) {
            vm.recruiter = response;
            vm.error = "Update successful!";
        }


        function onUpdateError(err) {
            vm.error = "Could not update user. Try after sometime.";
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


        function onUpdateRecruiterPasswordSuccess(response) {
            vm.passwordError = "Updated successfully";
            console.log(response);
        }

        function onUpdateRecruiterPasswordError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }

            vm.passwordError = "Failed to update password. Make sure that your old password is correct";

        }
    }
})();