(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeEditController", ResumeEditController);



    function ResumeEditController($location, $routeParams, ResumeService) {

        var vm=this;

        function init() {

            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            vm.resumeid = $routeParams['resumeid'];
            vm.downlaodDocx = downlaodDocx
            vm.downloadPDF = downloadPDF;
            vm.deleteResume = deleteResume;
            vm.pdfuri = "/api/displayResumePDF/" + vm.resumeid;
        }

        init()

        function downlaodDocx() {
            window.open("/api/downloadResumeDOCX/" + vm.resumeid);
        }

        function downloadPDF() {
            window.open("/api/downloadResumePDF/" + vm.resumeid);
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
