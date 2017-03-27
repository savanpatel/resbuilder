(function () {

    angular
        .module("ResumeBuilder")
        .controller("LoginController", LoginController)

        function LoginController($location) {

            var vm = this;

            vm.error = null;

        }


})();