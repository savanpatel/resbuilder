/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("RecruiterDashBoardController", RecruiterDashBoardController);

    function RecruiterDashBoardController($routeParams, RecruiterService) {

        var vm = this;

        function init() {
            vm.isCollapsed = false;
            vm.error = null;

            vm.rid = $routeParams['rid'];

            // functions.
            vm.getUsersForSkill = getUsersForSkill;

            getRecruiterById(vm.rid);
        }

        init();


        function getRecruiterById(recruiterId) {

            var promise = RecruiterService.findRecruiterById(recruiterId);

            promise.success(onFindRecruiterByIdSuccess);
            promise.error(onFindRecruiterByIdError);


        }


        function getUsersForSkill(skill) {
            console.log(skill);
            var promise = RecruiterService.findUsersBySkill(vm.rid, skill);
            promise.success(onFindUsersBySkillSuccess);
            promise.error(onFindUsersBySkillError);
        }

        /*Promise handlers*/

        function onFindRecruiterByIdSuccess(response) {

            vm.recruiter = response;
        }

        function onFindRecruiterByIdError(err) {

            vm.error = "Could not fetch info."
        }
        
        
        function onFindUsersBySkillSuccess(response) {
            vm.userList = response;
            if(null == vm.userList || vm.userList.length == 0){
                vm.error = "Could not find candidates matching skills.";
            } else {
                vm.error = null;
            }
            console.log(response);
        }

        /*
         *
         */
        function onFindUsersBySkillError(err) {
           console.log(err);
        }


    }
})();
