
(function () {

    angular
        .module("ResumeBuilder")
        .controller("BasicProfileEditController", BasicProfileEditController);

    function BasicProfileEditController($location, $routeParams, UserService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.userId = $routeParams['uid'];
            vm.uid = $routeParams['uid'];
            vm.updateUser = updateUser;
            vm.logout = logout;

            var promise = UserService.findUserById(vm.userId);

            promise.success(onFindUserSuccess);
            promise.error(onFindUserError);
        }


        init();



        function logout() {

            var promise = UserService.logout(vm.userId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }




        function updateUser(user) {
            vm.error = null;
            var promise = UserService.updateUser(user);
            promise.success(onUpdateSuccess);
            promise.error(onUpdateError);
        }


        /*---- Promise functions*/
        function onFindUserSuccess(response) {

            vm.user = response;
        }

        function onFindUserError(err) {
            vm.error = "Could not fetch data. Try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function onUpdateSuccess(response) {
            vm.user = response;
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
    }
})();