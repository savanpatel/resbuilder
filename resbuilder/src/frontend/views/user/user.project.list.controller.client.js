
(function () {

    angular
        .module("ResumeBuilder")
        .controller("ProjectController", ProjectController);

    function ProjectController($location, $routeParams, TechnicalSkillService, ProjectService, UserService) {


        var vm = this;

        var ERR_401 = "Unauthorized";
        var ERROR_REDIRECT = "/unauthorized";

        function init() {


            vm.isCollapsed = false;

            // functions
            vm.updateTechnicalSkill = updateTechnicalSkill;
            vm.createProject = createProject;
            vm.deleteProject = deleteProject;
            vm.logout = logout;


            vm.userId = $routeParams['uid'];
            vm.uid = $routeParams['uid']; //for menu.

            vm.projectList = null;
            // fetch the technical skills of user.
            findTechnicalSkillForUser(vm.userId);

            //fetch the project list for the user.
            findProjectListForUser(vm.userId);


        }


        init();


        /*find the technical skills for the user.*/
        function findTechnicalSkillForUser(userId) {

            var promise = TechnicalSkillService.findTechnicalSkillForUser(userId);

            promise.success(onFindTechnicalSkillForUserSuccess);
            promise.error(onFindTechnicalSkillForUserError);
        }



        /*
         * Update the technical skills for user.
         */
        function updateTechnicalSkill(technicalSkill) {

            console.log(technicalSkill);
            var newTechnicalSkill = angular.copy(technicalSkill);

            newTechnicalSkill.languages = [];
            for(var l in technicalSkill.languages){
                newTechnicalSkill.languages.push(technicalSkill.languages[l].text.toLowerCase());
            }

            newTechnicalSkill.database = [];
            for(var d in technicalSkill.database){
                newTechnicalSkill.database.push(technicalSkill.database[d].text.toLowerCase());
            }

            newTechnicalSkill.softwares = [];
            for(var s in technicalSkill.softwares){
                newTechnicalSkill.softwares.push(technicalSkill.softwares[s].text.toLowerCase());
            }

            newTechnicalSkill.operatingSystems = [];
            for(var o in technicalSkill.operatingSystems){
                newTechnicalSkill.operatingSystems.push(technicalSkill.operatingSystems[o].text.toLowerCase());
            }

            newTechnicalSkill.technologies = [];
            for(var t in technicalSkill.technologies){
                newTechnicalSkill.technologies.push(technicalSkill.technologies[t].text.toLowerCase());
            }

            var promise = TechnicalSkillService.updateTechnicalSkill(newTechnicalSkill, newTechnicalSkill._id);
            promise.success(onUpdateTechnicalSkillUpdateSuccess);
            promise.error(onUpdateTechnicalSkillUpdateError);

        }




        function findProjectListForUser(userId) {
            var promise = ProjectService.findProjectListForUser(userId);
            promise.success(onFindProjectListForUserSuccess);
            promise.error(onFindProjectListForUserError);
        }


        function logout() {

            var promise = UserService.logout(vm.userId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }



        function createProject(project) {

            var newProject = angular.copy(project);

            newProject.technologies = [];

            for(var t in project.technologies){
                newProject.technologies.push(project.technologies[t].text);
            }

            newProject.teammates = [];
            for(var t in project.teammates){
                newProject.teammates.push(project.teammates[t].text);
            }

            newProject.userId = vm.userId;

            var promise = ProjectService.createProject(newProject, vm.userId);
            promise.success(onCreateProjectSuccess);
            promise.error(onCreateProjectError);

        }


        function deleteProject(projectId) {
            var promise = ProjectService.deleteProject(projectId);

            promise.success(onDeleteProjectSuccess);
            promise.error(onDeleteProjectError);
        }

        /*
         * Promise functions.
         *
         */

        function onFindTechnicalSkillForUserSuccess(response) {

            console.log("Technical Skill found : " + response);
            vm.technicalSkill = response;
        }


        function onFindTechnicalSkillForUserError(error) {
            vm.error = "Could not fetch the technical skill." + error;
            if(error == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function onUpdateTechnicalSkillUpdateSuccess(response) {
            vm.technicalSkill = response;
            vm.error = "Updated Technical Skills successfully.";
        }


        function onUpdateTechnicalSkillUpdateError(error) {
            vm.error = "Could not update the technical skill." + error;
            if(error == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



        function onFindProjectListForUserSuccess(response){
            vm.projectList = response;

            console.log(response);
            if(null == vm.projectList || vm.projectList.length == 0){
                vm.noprojects = "You do not have any project. Add some.";
            }
        }

        function onFindProjectListForUserError(err) {
            vm.error = err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



        function onCreateProjectSuccess(response) {

            findProjectListForUser(vm.userId);
        }

        function onCreateProjectError(err) {

            vm.error = "Could not create a project. Error: " + err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



        function onDeleteProjectSuccess() {
            findProjectListForUser(vm.userId);
        }

        function onDeleteProjectError(err) {
            vm.error = "Could not delete the project. Error: " + err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
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