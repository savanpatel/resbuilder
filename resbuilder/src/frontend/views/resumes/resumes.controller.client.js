(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumesController", ResumesController);

    function ResumesController($sce, $scope, $location,$routeParams,ResumeService) {

        var vm = this;
        function init() {


            vm.isCollapsed = false;

            console.log("ghbjnkml")
            vm.uid = $routeParams['uid'];
            var promise = ResumeService.findResumeforUser(vm.uid);

            promise
                .success(renderAllResume)
                .error(errorRenderAllResume)
        }

        init()
        function renderAllResume(resumes) {
            var urls = []
            var loop = -1;

            console.log(resumes)
            for(var j = 0;j<resumes.length;j++){
                urls.push("http://localhost:3000/api/displayResumePDF/" + resumes[j]["_id"])
            }


            vm.allResumeUrls = urls;
            console.log(vm.allResumeUrls);

        }

        function errorRenderAllResume() {

        }


    }
})();
