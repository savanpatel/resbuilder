
(function () {

    angular
        .module("ResumeBuilder")
        .controller("ProjectController", ProjectController);

    function ProjectController($scope, $location, $routeParams, TechnicalSkillService, ProjectService) {
        var vm = this;
        function init() {

            vm.isCollapsed = false;

            // functions
            vm.updateTechnicalSkill = updateTechnicalSkill;
            vm.createProject = createProject;
            vm.deleteProject = deleteProject;


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

            var newTechnicalSkill = angular.copy(technicalSkill);

            newTechnicalSkill.languages = [];
            for(var l in technicalSkill.languages){
                newTechnicalSkill.languages.push(technicalSkill.languages[l].text);
            }

            newTechnicalSkill.database = [];
            for(var d in technicalSkill.database){
                newTechnicalSkill.database.push(technicalSkill.database[d].text);
            }

            newTechnicalSkill.softwares = [];
            for(var s in technicalSkill.softwares){
                newTechnicalSkill.softwares.push(technicalSkill.softwares[s].text);
            }

            newTechnicalSkill.operatingSystems = [];
            for(var o in technicalSkill.operatingSystems){
                newTechnicalSkill.operatingSystems.push(technicalSkill.operatingSystems[o].text);
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
        }


        function onUpdateTechnicalSkillUpdateSuccess(response) {
            vm.technicalSkill = response;
            vm.error = "Updated Technical Skills successfully.";
        }


        function onUpdateTechnicalSkillUpdateError(error) {
            vm.error = "Could not update the technical skill." + error;
        }



        function onFindProjectListForUserSuccess(response){
            vm.projectList = response;

            if(null == vm.projectList || vm.projectList.length == 0){
                vm.noprojects = "You do not have any project. Add some.";
            }
        }

        function onFindProjectListForUserError(err) {
            vm.error = err;
        }



        function onCreateProjectSuccess(response) {

            findProjectListForUser(vm.userId);
        }

        function onCreateProjectError(err) {

            vm.error = "Could not create a project. Error: " + err;
        }



        function onDeleteProjectSuccess() {
            findProjectListForUser(vm.userId);
        }

        function onDeleteProjectError(err) {
            vm.error = "Could not delete the project. Error: " + err;
        }

    }
})();