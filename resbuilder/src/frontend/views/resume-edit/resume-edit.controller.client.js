(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeEditController", ResumeEditController);

    function ResumeEditController($sce, $scope, $location,$routeParams,ResumeService) {

        var vm = this;
        vm.isCollapsed = false;

        vm.uid = $routeParams['uid'];
        vm.resumeid = $routeParams['resumeid'];
        vm.pdfuri = "http://localhost:3000/api/displayResumePDF/" + vm.resumeid;
        console.log(vm.pdfuri)


    }

})();
