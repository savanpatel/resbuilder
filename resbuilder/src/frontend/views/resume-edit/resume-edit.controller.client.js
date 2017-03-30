(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeEditController", ResumeEditController);

    function ResumeEditController($sce, $scope, $location) {

        var vm = this;
        vm.isCollapsed = false;


    }
})();
