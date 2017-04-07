
(function () {

    angular
        .module("ResumeBuilder")
        .controller("RecruiterBasicProfileEditController", RecruiterBasicProfileEditController);

    function RecruiterBasicProfileEditController($scope, $location, $routeParams, RecruiterService) {
        var vm = this;
        function init() {

            vm.recruiterId = $routeParams['rid'];
            vm.rid = $routeParams['rid'];

            vm.updateRecruiter = updateRecruiter;

            var promise = RecruiterService.findRecruiterById(vm.recruiterId);

            promise.success(onFindRecruiterByIdSuccess);
            promise.error(onFindRecruiterByIdError);


        }


        init();



        function updateRecruiter(recruiter) {
            vm.error = null;
            var promise = RecruiterService.updateRecruiter(recruiter);
            promise.success(onUpdateSuccess);
            promise.error(onUpdateError);
        }







        /*---- Promise functions*/
        function onFindRecruiterByIdSuccess(response) {

            vm.recruiter = response;
        }

        function onFindRecruiterByIdError(err) {
            vm.error = "Could not fetch data. Try after sometime.";
        }


        function onUpdateSuccess(response) {
            vm.recruiter = response;
            vm.error = "Update successful!";
        }

        function onUpdateError(err) {
            vm.error = "Could not update user. Try after sometime.";
        }

    }
})();