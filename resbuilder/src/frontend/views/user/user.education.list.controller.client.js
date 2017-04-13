
(function () {

    angular
        .module("ResumeBuilder")
        .controller("EducationController", EducationController);

    function EducationController($location, $routeParams, EducationService, UserService) {
        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.userId = $routeParams["uid"];
            vm.uid = $routeParams["uid"]; // for menu
            vm.error = null;
            vm.createEducation = createEducation;
            vm.deleteEducation = deleteEducation;
            vm.arrayToString = arrayToString;
            vm.logout = logout;

            findEducationForUser();
        }
        init();
        /*
         * finds the education for user.
         */
        function findEducationForUser() {
            if(null != vm.userId){

                var promise = EducationService.findEducationForUser(vm.userId);
                promise.success(onFindEducationForUserSuccess);
                promise.error(onFindEducationForUserError);
            }
        }


        /*
         *  Creates a new education and updates list on success.
         */
        function createEducation(education) {
            if(null != vm.userId){
                var newEducation = angular.copy(education);
                var courses = [];
                for (c in education.courses){
                    console.log(education.courses[c].text);
                    courses.push(education.courses[c].text);
                }
                newEducation.courses = courses;
                newEducation.userId = vm.userId;
                var promise = EducationService.createEducation(newEducation);
                promise.success(onCreateEducationSuccess);
                promise.error(onCreateEducationError);
            }
        }




        /*
         * deletes the education.
         */
        function deleteEducation(educationId) {
            if(null != educationId){
                var promise = EducationService.deleteEducation(educationId);
                promise.success(onDeleteEducationSuccess);
                promise.error(onDeleteEducationError);
            }
        }



        function logout() {

            var promise = UserService.logout(vm.userId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }



        /*
         *  Promise handlers
         *
         */

        function onFindEducationForUserSuccess(response) {
            vm.educationList = response;
            vm.error = null;
        }

        function onFindEducationForUserError(err) {
            vm.error = err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



        function onCreateEducationSuccess(response) {
            vm.error = "Education Added!";
            vm.school = null;
            findEducationForUser();
        }

        function onCreateEducationError(err) {
            vm.error = "Error! Could not add education. Please try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }




        function onDeleteEducationSuccess(response) {
            findEducationForUser();
        }

        function onDeleteEducationError(error) {
            vm.error = "Could not delete the education. Please try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function arrayToString(array) {
            return array.join(', ');
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