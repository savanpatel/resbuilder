(function () {

    angular
        .module("ResumeBuilder")
        .controller("ResumesController", ResumesController);

    function ResumesController($location, $routeParams, ResumeService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];

            vm.editResume = editResume;
            vm.deleteResume = deleteResume;
            vm.downloadResumePdf = downloadResumePdf;
            vm.downlaodResumeDocx = downlaodResumeDocx;
            var promise = ResumeService.findResumeforUser(vm.uid);

            promise
                .success(renderAllResume)
                .error(errorRenderAllResume)
        }

        init()

        function editResume(rid) {
            console.log("clicked on resume")

            $location.url("/user/" + vm.uid +"/dashboard/resumeEdit/" +rid);

        }
        function downlaodResumeDocx(resumeid) {
            window.open("/api/downloadResumeDOCX/" + resumeid);
        }

        function downloadResumePdf(resumeid) {

            window.open("/api/downloadResumePDF/"+resumeid);
        }

        function deleteResume(index) {

            console.log(index);
            var array1 = vm.allResumeUrls;
            console.log(array1);

            var resume1 = array1[index]
            var resumeId1 = resume1['_id']
            console.log(resumeId1)
            var promise = ResumeService.deleteResume(resumeId1)

            promise
                .success(deleted)
                .error(unsuccessfullDeleted)

        }

        function deleted(status) {
            vm.message = "Resume Deleted";

            var promise = ResumeService.findResumeforUser(vm.uid);

            promise
                .success(renderAllResume)
                .error(errorRenderAllResume)
        }

        function unsuccessfullDeleted(err) {
            vm.error = "Resume not Deleted successfully";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }

        function renderAllResume(resumes) {
            var urls = []
            var loop = -1;

            console.log(resumes)
            for(var j = 0;j<resumes.length;j++){

                var jsonResume = {
                    "url": "/api/displayResumePDF/" + resumes[j]["_id"],
                    "_id":resumes[j]["_id"]
                }
                urls.push(jsonResume);
            }


            vm.allResumeUrls = urls;
            console.log(vm.allResumeUrls);
        }


        function errorRenderAllResume(err) {
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


    }
})();
