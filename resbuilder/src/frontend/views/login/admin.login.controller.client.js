(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminLoginController", AdminLoginController);

    function AdminLoginController($location, UserService) {

            var vm = this;

            function init() {
                vm.error = null;

                //functions
                vm.login = login;;

            }

            init();

            function login(user) {

                if(null == user || null == user.username || null == user.password){
                    vm.error = "Empty username/password.";
                    return;
                }

                var promise = UserService.findAdminUserByCredentials(user.username, user.password);

                promise.success(onAdminLoginSuccess);
                promise.error(onAdminLoginFailure);
            }





            
            /* Promise handlers*/

            function onAdminLoginSuccess(response) {

                var user = response;
                if(user){
                    $location.url("/admin/" + user._id + "/dashboard")
                } else{
                    vm.error = "Invalid Credentials.";
                }

            }

            function onAdminLoginFailure(response) {
                vm.error = "Could not find user. Error: " + response;
            }

    }
})();