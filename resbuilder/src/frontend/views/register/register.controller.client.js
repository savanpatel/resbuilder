

(function () {

    angular
        .module("ResumeBuilder")
        .controller("RegisterController", RegisterController);

    function RegisterController($scope, $location, UserService) {


        var vm = this;

        function init() {

            vm.error = null;
            vm.success = null;

            vm.checkUsername = null;
            vm.checkPassword = null;
            vm.checkRePassword = null;
            vm.checkFirstName = null;
            vm.checkEmail = null;

            vm.checkUsernameAvailability = checkUsernameAvailability;
            vm.register = register;
        }

        init();


        /*
         * validates user fields.
         *
         */
        function register(user) {

            if(!validateUser(user)){
                return;
            }

            var promise = UserService.createUser(user);

            promise.success(onCreateUserSuccess);
            promise.error(onCreateUserFailure);
        }


        /*
         * validates if user fields are non empty and passwords match.
         */
        function validateUser(user) {

            var isValid = true;

            if(null == user){
                isValid = false;
            } else {

                if(isEmptyOrNull(user.password)) {
                    vm.checkPassword = "Password can not be empty";
                    isValid = false;
                } else if(isEmptyOrNull(user.repassword)) {
                    vm.checkRePassword = "Please retype passoword";
                    isValid = false;
                } else if(user.password != user.repassword){
                    vm.checkRePassword = "Passwords do not match!";
                    isValid = false;
                }

                if(isEmptyOrNull(user.username)){
                    vm.checkUsername = "Username can not be empty";
                    isValid = false;
                }

                if(isEmptyOrNull(user.email)){
                    vm.checkEmail = "Email can not be empty";
                    isValid = false;
                }

                if(isEmptyOrNull(user.firstName)){
                    vm.checkFirstName = "First Name cannot be empty.";
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

            var promise = UserService.checkUsernameAvailable(username);

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
        function onCreateUserSuccess(response) {

            var user = response;
            vm.success = "Registration Successful! Goto home page to login.";
        }


        function onCreateUserFailure(err) {

            vm.error = "Failed to create user. Please try again after sometime.";
        }

    }



})();