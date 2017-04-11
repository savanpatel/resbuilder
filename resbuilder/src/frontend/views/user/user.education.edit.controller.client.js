
(function () {

    angular
        .module("ResumeBuilder")
        .controller("EditEducationController", EditEducationController);

    function EditEducationController($location, $routeParams, EducationService) {
        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.userId = $routeParams['uid'];
            vm.error = null;
            vm.educationId = $routeParams['eid'];

            findEducationById(vm.educationId);

            vm.updateEducation = updateEducation;
        }


        init();



        function updateEducation(education) {
            if(null != vm.userId && null != education){
                education.userId = vm.userId;

                var newEducation = angular.copy(education);
                newEducation.courses = [];
                for(c in education.courses){
                    newEducation.courses.push(education.courses[c].text);
                }
                var promise = EducationService.updateEducation(newEducation, vm.educationId);

                promise.success(onUpdateEducationSuccess);
                promise.error(onUpdateEducationError);
            }
        }



        function findEducationById(educationId){

            var promise = EducationService.findEducationById(educationId);

            promise.success(onFindEducationByIdSuccess);
            promise.error(onFindEducationByIdError);
        }




        /*Promise functions.*/
        function onFindEducationByIdSuccess(response) {
             vm.school = response;
        }

        function onFindEducationByIdError(err) {
            vm.error = "Can not find education. Please try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



        function onUpdateEducationSuccess(response) {
            vm.error = "Updated successfully";
            $location.url("/user/" + vm.userId + "/education");
        }

        function onUpdateEducationError(err) {
            vm.error = "Update failed!. Please try after sometimes.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }
    }
})();