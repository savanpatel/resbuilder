(function () {

    angular
        .module("ResumeBuilder")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, RecruiterService) {

            var vm = this;

            function init() {
                vm.error = null;
                vm.recruiterError = null;

                //functions
                vm.login = login;
                vm.loginRecruiter = loginRecruiter;

            }

            init();

            function login(user) {

                if(null == user || null == user.username || null == user.password){
                    vm.error = "Empty username/password.";
                    return;
                }

                var promise = UserService.findUserByCredentials(user.username, user.password);

                promise.success(onLoginSuccess);
                promise.error(onLoginFailure);
            }



            function loginRecruiter(recruiter) {

                if(null == recruiter || null == recruiter.username || null == recruiter.password){
                    vm.recruiterError = "Empty username/password.";
                    return;
                }

                var promise = RecruiterService.findRecruiterByCredentials(recruiter.username, recruiter.password);

                promise.success(onRecruiterLoginSuccess);
                promise.error(onRecruiterLoginFailure);
            }



            
            /* Promise handlers*/

            function onLoginSuccess(response) {

                var user = response;
                console.log(user);

                if(user){
                    if(user.role == "ADMIN"){
                        $location.url("/admin/" + user._id + "/dashboard")
                    } else {
                        $location.url("/user/" + user._id + "/dashboard");
                    }

                } else{
                    vm.error = "Invalid Credentials.";
                }

            }

            function onLoginFailure(response) {
                vm.error = "Could not find user. Error: " + response;
            }



            /*recruiter login promise handlers*/
            function onRecruiterLoginSuccess(response) {

                var user = response;
                if(user){
                    $location.url("/recruiter/" + user._id + "/dashboard")
                } else{
                    vm.recruiterError = "Invalid Credentials.";
                }

            }

            function onRecruiterLoginFailure(response) {
                vm.recruiterError = "Could not find user. Error: " + response;
            }

    }
})();