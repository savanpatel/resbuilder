/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("DashBoardController", DashBoardController);


    function DashBoardController($sce, $scope, $routeParams, $location,ResumeDataService,ResumeService, TechnicalSkillService, JobSuggestionService) {


        var vm = this;
        function init() {
            vm.isCollapsed = false;
            vm.error = null;
            vm.GetResumeData = GetResumeData;
            vm.downloadResume = downloadResume;

            console.log("in init of dashboard controller");
            vm.uid = $routeParams['uid'];

            findJobSuggestions(vm.uid);

            console.log("ghbjnkml")
            var promise = ResumeService.findResumeforUser(vm.uid);

            promise
                .success(renderAllResume)
                .error(errorRenderAllResume)

            vm.deleteResume = deleteResume;

        }

        function downloadResume(resumeid) {
            window.open("http://localhost:3000/api/downloadResumePDF/"+resumeid);
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
                    "url": "http://localhost:3000/api/displayResumePDF/" + resumes[j]["_id"],
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

            console.log("in fetch job");
            var promise = JobSuggestionService.findJob(skills);
            promise.success(onFetchJobSuccess);
            promise.error(onFetchJobError);
        }

        /*
         * Promise functions.
         */
        function onFindTechnicalSkillForUserSuccess(response) {

            console.log("in find technical skill success");
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

        function onFindTechnicalSkillForUserError(response) {

            var technicalSkillList = ['Java', 'Ruby', 'Python', 'MySQL'];

            fetchJob(technicalSkillList);
        }


        function GetResumeData(sw) {

            console.log("SW")
            console.log(sw)

            if(sw === 0)
            {

                console.log(vm.JobURL)
                ResumeDataService.setUrl(vm.JobURL);
            }
            else
            {
                ResumeDataService.setUrl(sw);
            }

            $location.url('/user/'+ vm.uid +'/dashboard/resumeData');

        }
        function onGettingResumeData(data) {
            console.log(data)
        }
        function OnErrorGettingResumeData() {
            console.log("Error")
        }



        function onFetchJobSuccess(response) {

            response = shuffle(response);
            vm.jobList = response.slice(0,4);
            console.log(vm.jobList);
        }

        function onFetchJobError(err) {
            vm.jobList = null;
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
    }
})();
