(function () {

    angular
        .module("ResumeBuilder")
        .controller("LoginController", LoginController);

    function LoginController($scope, $location) {

            var vm = this;

            vm.error = null;

        $scope.content = undefined;
        $scope.contentToggle = function(name){
            if ($scope.isContentToggled(name)){
                $scope.content = undefined;
            } else {
                $scope.content = name;
            }
        }

        $scope.isContentToggled = function (name){
            return $scope.content == name;
        }

        }
})();