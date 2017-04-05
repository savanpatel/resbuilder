/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("DashBoardController", DashBoardController);

    function DashBoardController($sce, $scope, $routeParams, $location,ResumeDataService, TechnicalSkillService, JobSuggestionService) {

        var vm = this;

        function init() {
            vm.isCollapsed = false;
            vm.error = null;
            vm.GetResumeData = GetResumeData;

            console.log("in init of dashboard controller");
            vm.uid = $routeParams['uid'];

            findJobSuggestions(vm.uid);

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


        function GetResumeData() {

            console.log("GEt data")
            var url = vm.JobURL
            var promise = ResumeDataService.getResumeData(vm.uid);

            promise.success(onGettingResumeData)
            promise.error(OnErrorGettingResumeData)


        }
        function onGettingResumeData() {
            console.log("Done")
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
