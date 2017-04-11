(function () {

    angular
        .module("ResumeBuilder")
        .controller("RecruiterRegisterController", RecruiterRegisterController);

    function RecruiterRegisterController(RecruiterService) {


        var vm = this;

        function init() {

            // error messages.
            vm.error = null;
            vm.checkUsername = null;
            vm.checkPassword = null;
            vm.checkRePassword = null;
            vm.checkFirstName = null;
            vm.checkEmail = null;
            vm.checkWebsite = null;
            vm.checkCompanyName = null;

            // functions.
            vm.checkUsernameAvailability = checkUsernameAvailability;
            vm.registerRecruiter = registerRecruiter;

        }

        init();


        /*
         * validates recruiter fields and registers.
         *
         */
        function registerRecruiter(recruiter) {

            if(!validateRecruiter(recruiter)){
                return;
            }

            var promise = RecruiterService.createRecruiter(recruiter);

            promise.success(onCreateRecruiterSuccess);
            promise.error(onCreateRecruiterFailure);
        }


        /*
         * validates if user fields are non empty and passwords match.
         */
        function validateRecruiter(recruiter) {

            var isValid = true;

            if(null == recruiter){
                isValid = false;
            } else {

                if(isEmptyOrNull(recruiter.password)) {
                    vm.checkPassword = "Password can not be empty";
                    isValid = false;
                } else if(isEmptyOrNull(recruiter.repassword)) {
                    vm.checkRePassword = "Please retype passoword";
                    isValid = false;
                } else if(recruiter.password != recruiter.repassword){
                    vm.checkRePassword = "Passwords do not match!";
                    isValid = false;
                }

                if(isEmptyOrNull(recruiter.username)){
                    vm.checkUsername = "Username can not be empty";
                    isValid = false;
                }

                if(isEmptyOrNull(recruiter.companyname)){
                    vm.checkCompanyName = "Company name can not be empty";
                    isValid = false;
                }


                if(isEmptyOrNull(recruiter.email)){
                    vm.checkEmail = "Email can not be empty";
                    isValid = false;
                }

                if(isEmptyOrNull(recruiter.website)){
                    vm.checkWebsite = "Website link cannot be empty.";
                    isValid = false;
                }
            }

            return isValid;
        }



        /*check if var is null or empty.*/
        function isEmptyOrNull(field) {
            if(null == field || "" == field){
                return true;
            }

            return false;
        }



        /*
         * Checks if username is available for registering.
         */
        function checkUsernameAvailability(username){

            var promise = RecruiterService.checkUsernameAvailable(username);

            promise.success(onCheckUsernameAvailableSuccess);
            promise.error(onCheckUsernameAvailableError);

        }

        /*sets helper message if username is not available.*/
        function onCheckUsernameAvailableSuccess(response) {
            if(response.isAvailable == false){
                vm.checkUsername = "username not available.";
            }
            else{
                vm.checkUsername = "username available";
            }
        }


        /*sets helper message if username availability check failed.*/
        function onCheckUsernameAvailableError(response) {
            vm.checkUsername = null;

        }



        /*redirects to dashboard on successful registration.*/
        function onCreateRecruiterSuccess(response) {

            var recruiter = response;
            vm.success = "Registration Successful! Goto home page to login.";
            vm.error = null;
        }


        function onCreateRecruiterFailure(err) {

            vm.error = "Failed to create user. Please try again after sometime." + err;
        }

    }



})();