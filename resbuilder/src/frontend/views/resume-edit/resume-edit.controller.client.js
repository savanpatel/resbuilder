(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeEditController", ResumeEditController);



    function ResumeEditController($sce, $window, $location,$routeParams,ResumeService) {

        var vm=this;

        function init() {

            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            vm.resumeid = $routeParams['resumeid'];
            vm.downlaodDocx = downlaodDocx
            vm.downloadPDF = downloadPDF;
            vm.deleteResume = deleteResume;
            vm.pdfuri = "http://localhost:3000/api/displayResumePDF/" + vm.resumeid;
            console.log(vm.pdfuri)


        }

        init()


        function downlaodDocx() {
            window.open("http://localhost:3000/api/downloadResumeDOCX/" + vm.resumeid);


        }

        function downloadPDF() {

            window.open("http://localhost:3000/api/downloadResumePDF/" + vm.resumeid);

        }

        function deleteResume() {

            var promise = ResumeService.deleteResume(vm.resumeid);

            promise
                .success(stateAfterDelete)
                .error(stateAfterNotDeleted)

        }

        function stateAfterDelete() {

            $location.url('/user/' + vm.uid + '/dashboard');

        }

        function stateAfterNotDeleted() {

            $location.url('/user/' + vm.uid + '/dashboard');

        }
    }
})();
