(function() {
    angular
        .module("ResumeBuilder")
        .factory("ProjectService", ProjectService);

    var PROJECT_SERVICE_URL = "/api/project";


    function ProjectService($http) {


        var api = {
            "createProject": createProject,
            "findProjectListForUser": findProjectListForUser,
            "updateProject":updateProject,
            "deleteProject":deleteProject,
            "findProjectById":findProjectById
        };

        return api;



        /*
         * Create project for user.
         */
        function createProject(project) {
            var createProjectUrl = PROJECT_SERVICE_URL;
            return $http.post(createProjectUrl, project);
        }



        /*
         * Update the project.
         */
        function updateProject(project, projectId) {
            var updateProjectUrl = PROJECT_SERVICE_URL + "/" + projectId;
            return $http.put(updateProjectUrl, project);
        }



        /*
         * Delete the project by id.
         */
        function deleteProject(projectId) {
            var deleteProjectUrl = PROJECT_SERVICE_URL + "/" + projectId;
            return $http.delete(deleteProjectUrl);
        }



        /*
         * find the project list for the user.
         */
        function findProjectListForUser(userId) {
            var findProjectListForUserUrl = PROJECT_SERVICE_URL + "/user/" + userId;
            return $http.get(findProjectListForUserUrl);
        }


        /*
         * find the project by project id.
         */
        function findProjectById(projectId) {
            var findProjectByIdUrl = PROJECT_SERVICE_URL + "/" + projectId;
            return $http.get(findProjectByIdUrl);
        }
    }
})();