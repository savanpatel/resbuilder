/**
 * Created by panktibhalani on 4/11/17.
 */


(function () {

    angular
        .module("ResumeBuilder")
        .controller("RecruiterBasicProfileAdminEditController", RecruiterBasicProfileAdminEditController);

    function RecruiterBasicProfileAdminEditController($location, $routeParams, RecruiterService,AdminService) {
        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.aid = $routeParams['aid'];
            vm.recruiterId = $routeParams['rid'];
            vm.rid = $routeParams['rid'];

            vm.update = update;

            var promise = RecruiterService.findRecruiterById(vm.recruiterId);

            promise.success(onFindRecruiterByIdSuccess);
            promise.error(onFindRecruiterByIdError);
        }

        init();

        function update(user) {

            var promise = AdminService.updateRecruiterByAdmin(vm.aid,user);

            promise
                .success(updatedSuccesfully)
                .error(unSuccessfulUpdate)
        }

        function updatedSuccesfully() {
            vm.error = "successful updated"

        }

        function unSuccessfulUpdate() {
            vm.error = "unsuccessful updated"
        }

        /*---- Promise functions*/
        function onFindRecruiterByIdSuccess(response) {

            vm.recruiter = response;
        }

        function onFindRecruiterByIdError(err) {
            vm.error = "Could not fetch data. Try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



    }
})();