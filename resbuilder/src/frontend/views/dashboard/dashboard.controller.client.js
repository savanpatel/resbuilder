/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("DashBoardController", DashBoardController);


    function DashBoardController($routeParams, $location,
                                 ResumeDataService, ResumeService,
                                 TechnicalSkillService, JobSuggestionService,
                                 UserService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.error = null;
            vm.editResume = editResume;
            vm.GetResumeData = GetResumeData;
            vm.downloadResumePdf = downloadResumePdf;
            vm.downlaodResumeDocx = downlaodResumeDocx;
            vm.uid = $routeParams['uid'];
            vm.logout = logout;

            findJobSuggestions(vm.uid);

            console.log("ghbjnkml")
            var promise = ResumeService.findResumeforUser(vm.uid);

            promise
                .success(renderAllResume)
                .error(errorRenderAllResume)

            vm.deleteResume = deleteResume;

        }

        function editResume(rid) {
            console.log("clicked on resume")

            $location.url("/user/" + vm.uid +"/dashboard/resumeEdit/" +rid);

        }

        function logout() {

            var promise = UserService.logout(vm.uid);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
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

        function unsuccessfullDeleted() {
            vm.error = "Resume not Deleted successfully"
        }

        function renderAllResume(resumes) {
            var urls = []
            var loop = -1;
            console.log("All resumes");
            console.log(resumes)
            if(resumes.length < 4)
            {
                loop = resumes.length;
            }
            else
            {
                loop = 4;
            }

            for(var j = 0;j<loop;j++){
                var jsonResume = {
                    "url": "/api/displayResumePDF/" + resumes[j]["_id"],
                    "_id":resumes[j]["_id"]
                }
                urls.push(jsonResume);
            }

            console.log(urls)
            vm.allResumeUrls = urls;
            console.log(vm.allResumeUrls);

        }

        function errorRenderAllResume() {

        }

        init();


        function findJobSuggestions(userId) {

            console.log("in find job suggestions");
            var promise = TechnicalSkillService.findTechnicalSkillForUser(userId);
            promise.success(onFindTechnicalSkillForUserSuccess);
            promise.error(onFindTechnicalSkillForUserError);

        }



        function fetchJob(skills) {

            var promise = JobSuggestionService.findJob(skills);
            promise.success(onFetchJobSuccess);
            promise.error(onFetchJobError);
        }

        /*
         * Promise functions.
         */
        function onFindTechnicalSkillForUserSuccess(response) {

            var technicalSkillList = [];
            var skill = response;

            for(var l in skill.languages){
                technicalSkillList.push(skill.languages[l]);
            }

            for(var o in skill.operatingSystems){
                technicalSkillList.push(skill.operatingSystems[o]);
            }

            for(var s in skill.softwares){
                technicalSkillList.push(skill.softwares[s]);
            }

            for(var d in skill.database){
                technicalSkillList.push(skill.database[d]);
            }

            fetchJob(technicalSkillList);
        }

        function onFindTechnicalSkillForUserError(err) {

            var technicalSkillList = ['Java', 'Ruby', 'Python', 'MySQL'];

            fetchJob(technicalSkillList);

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function GetResumeData(sw) {


            console.log("SW")
            console.log(sw)

            if(sw === 0) {

                ResumeDataService.setUrl(vm.JobURL);

            }
            else {
                console.log("create resume")
                ResumeDataService.setUrl(sw);

            }
            $location.url('/user/'+ vm.uid +'/dashboard/resumeData');
        }


        function onFetchJobSuccess(response) {

            console.log(response);
            response = shuffle(response);
            vm.jobList = response.slice(0,4);
            console.log(vm.jobList);
        }

        function onFetchJobError(err) {
            console.log(err);
            vm.jobList = null;

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function shuffle(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }

            return a;
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
    }
})();
