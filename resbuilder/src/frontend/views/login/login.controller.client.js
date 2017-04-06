(function () {

    angular
        .module("ResumeBuilder")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location, UserService, WorkExpService, RecruiterService) {

            var vm = this;

            function init() {
                vm.error = null;
                vm.recruiterError = null;

                //functions
                vm.login = login;
                vm.signInWithLinkedIn = signInWithLinkedIn;
                vm.loginRecruiter = loginRecruiter;

                $scope.signInWithLinkedIn = signInWithLinkedIn;
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



        function signInWithLinkedIn(data) {

                console.log("In sign in with linked in");
                vm.linkedInUser = data;
                var user = {
                    username:data.id, // currently mapping linked in id to username. It is unique to application.
                    firstName:data.firstName,
                    lastName:data.lastName,
                    email:data.emailAddress
                };
                console.log("Check1");

                console.log(user);
                console.log("Check1 End");
                var promise = UserService.createUser(user);

                promise.success(onCreateUserSuccessLinkedIn);
                promise.error(onCreateUserFailureLinkedIn);

            }


            function createWorkExp() {

                console.log("In create work exp.");
                var position = vm.linkedInUser.positions.values[0];

                var workExp = {
                    userId: vm.user._id,
                    jobTitle: position.title,
                    description: position.summary,
                    startDate: position.startDate.month + "/" + position.startDate.year,
                    location: position.location.name + ", " + position.location.country.name
                };

                if(null != position.endDate){

                    workExp.endDate = position.endDate.month + "/" + position.endDate.year;
                }

                console.log("-------------------");
                console.log(workExp);
                var promise = WorkExpService.createWorkExp(workExp);

                promise.success(onCreateWorkExpSuccess);
                promise.error(onCreateWorkExpFailure);
            }
            
            
            /* Promise handlers*/

            function onLoginSuccess(response) {

                var user = response;
                if(user){
                    $location.url("/user/" + user._id + "/dashboard")
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

            /*redirects to dashboard on successful registration.*/
            function onCreateUserSuccessLinkedIn(response) {

                console.log("---------New user--------");
                console.log(response);
                var user = response;
                vm.user = user;
                vm.redirectUrl = "/user/" + user._id + "/dashboard";
                console.log(user);
                if(user.isNew == true){
                    console.log("Creating new workexp");
                    createWorkExp();
                }
                else {
                    console.log("Old user");
                    $location.url(vm.redirectUrl);
                }
            }



            function onCreateWorkExpSuccess(response) {
                var workexp = response;

                console.log("New work exp:" + workexp);

                var redirectUrl = vm.redirectUrl;
                vm.redirectUrl = null;
                $location.url(redirectUrl);
            }

        function onCreateWorkExpFailure(response) {
            alert("Failed to import work experince.");
            var redirectUrl = vm.redirectUrl;
            vm.redirectUrl = null;
            $location.url(redirectUrl);
        }

            function onCreateUserFailureLinkedIn(err) {

                vm.error = "Failed to create user. Please try again after sometime." + err;
                var redirectUrl = vm.redirectUrl;

            }
        }
})();