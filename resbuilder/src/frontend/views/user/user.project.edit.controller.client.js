
(function () {

    angular
        .module("ResumeBuilder")
        .controller("EditProjectController", EditProjectController);

    function EditProjectController($scope, $location, $routeParams, ProjectService) {
        var vm = this;
        function init() {
            vm.isCollapsed = false;
            vm.uid = $routeParams['uid'];
            vm.pid = $routeParams['pid'];

            vm.userId = $routeParams['uid'];
            vm.projectId = $routeParams['pid'];


            vm.updateProject = updateProject;

            findProjectById(vm.projectId);

        }


        init();


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
        }


        function onUpdateProjectSuccess(response) {
            $location.url("/user/" + vm.userId + "/project");
        }

        function onUpdateProjectError(err) {
            vm.error = "Could not update project. Error: " + err;
        }
    }
})();