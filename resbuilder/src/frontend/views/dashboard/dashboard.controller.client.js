/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("DashBoardController", DashBoardController);

    function DashBoardController($routeParams, $location, ResumeDataService, TechnicalSkillService, JobSuggestionService) {

        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";
        function init() {
            vm.isCollapsed = false;
            vm.error = null;
            vm.GetResumeData = GetResumeData;

            vm.uid = $routeParams['uid'];

            findJobSuggestions(vm.uid);

        }

        init();


        function findJobSuggestions(userId) {

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

        function onFindTechnicalSkillForUserError(response) {

            var technicalSkillList = ['Java', 'Ruby', 'Python', 'MySQL'];
            if(response == ERR_401){
                $location.url(ERROR_REDIRECT);
            } else {

                fetchJob(technicalSkillList);
            }
        }


        function GetResumeData() {

            console.log("Get data")
            ResumeDataService.setUrl(vm.JobURL);

            $location.url('/user/'+ vm.uid +'/dashboard/resumeData');

        }


        function onGettingResumeData(data) {
            console.log(data)
        }
        function OnErrorGettingResumeData(err) {
            console.log("Error")
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
    }
})();
