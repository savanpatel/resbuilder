
(function () {

    angular
        .module("ResumeBuilder")
        .controller("EditProjectController", EditProjectController);

    function EditProjectController($location, $routeParams, ProjectService, UserService) {
        var vm = this;

        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            vm.pid = $routeParams['pid'];

            vm.userId = $routeParams['uid'];
            vm.projectId = $routeParams['pid'];


            vm.updateProject = updateProject;
            vm.logout = logout;

            findProjectById(vm.projectId);

        }


        init();

        function logout() {

            var promise = UserService.logout(vm.userId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }


        function findProjectById(projectId) {
            var promise = ProjectService.findProjectById(projectId);
            promise.success(onFindProjectByIdSuccess);
            promise.error(onFindProjectByIdError);

        }



        function updateProject(project) {
            var updatedProject = angular.copy(project);

            updatedProject.technologies = [];

            for(var t in project.technologies){
                updatedProject.technologies.push(project.technologies[t].text);
            }

            updatedProject.teammates = [];
            for(var t in project.teammates){
                updatedProject.teammates.push(project.teammates[t].text);
            }

            updatedProject.userId = vm.userId;

            var promise = ProjectService.updateProject(updatedProject, vm.projectId);
            promise.success(onUpdateProjectSuccess);
            promise.error(onUpdateProjectError);

        }


        /*Promise functions*/
        function onFindProjectByIdSuccess(response) {
            vm.project = response;
        }

        function onFindProjectByIdError(err) {
            vm.error = "Could not fetch project. Please try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function onUpdateProjectSuccess(response) {
            $location.url("/user/" + vm.userId + "/project");
        }

        function onUpdateProjectError(err) {
            vm.error = "Could not update project. Error: " + err;
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