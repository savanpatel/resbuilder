(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumeEditController", ResumeEditController);



    function ResumeEditController($location, $routeParams, ResumeService,UserService) {

        var vm=this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.isCollapsed = false;
            vm.logout = logout;
            vm.uid = $routeParams['uid'];
            vm.resumeid = $routeParams['resumeid'];
            vm.downlaodDocx = downlaodDocx
            vm.downloadPDF = downloadPDF;
            vm.deleteResume = deleteResume;
            vm.pdfuri = "/api/displayResumePDF/" + vm.resumeid;
        }

        init()

        function logout() {

            var promise = UserService.logout(vm.uid);
            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }


        function onLogoutSuccess(response) {
            $location.url("/");
        }

        function onLogoutError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            } else{
                $location.url("/");
            }
        }

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
