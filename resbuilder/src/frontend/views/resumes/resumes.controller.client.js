(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumesController", ResumesController);

    function ResumesController($sce, $scope, $location) {

        var vm = this;
        vm.isCollapsed = false;


    }
})();
