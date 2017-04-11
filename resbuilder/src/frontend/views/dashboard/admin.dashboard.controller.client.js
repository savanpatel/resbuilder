/**
 * Created by panktibhalani on 3/27/17.
 */

(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminDashBoardController", AdminDashBoardController);

    function AdminDashBoardController($location, $routeParams,
                                      AdminService, MessageService,
                                      UserService, RecruiterService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {
            vm.isCollapsed = false;
            vm.error = null;

            vm.aid = $routeParams['aid'];
            vm.userStats = {
                userCount:0,
                recruiterCount:0,
                newMessageCount:0
            };

            vm.newMessageCount = 0;

            vm.logout = logout;
            vm.checkUsernameAvailability = checkUsernameAvailability;
            vm.createUser = createUser;
            vm.checkRecruiterUsernameAvailability = checkRecruiterUsernameAvailability;
            vm.registerRecruiter = registerRecruiter;


            fetchStats(vm.aid);
        }


        init();



        function createUser(user) {
            console.log(user);
            var promise = UserService.createUser(user);

            promise.success(onCreateUserSuccess);
            promise.error(onCreateUserFailure);
        }


        /*ends the session.*/
        function logout() {

            var promise = AdminService.logout(vm.aid);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }


        /*
         * validates recruiter fields and registers.
         *
         */
        function registerRecruiter(recruiter) {

            var promise = RecruiterService.createRecruiter(recruiter);

            promise.success(onCreateRecruiterSuccess);
            promise.error(onCreateRecruiterFailure);
        }

        /*
         * Fetch the stats for admin like usercount, new messages, recruiter count etc.
         */
        function fetchStats(adminId) {

            var promise = AdminService.fetchStats(adminId);
            promise.success(onFetchStatsSuccess);
            promise.error(onFetchStatsError);

            var promise2 = MessageService.getNewMessageCountByReceiverId(adminId);

            promise2.success(onGetNewMessageCountSuccess);
            promise2.error(onGetNewMessageCountError);

        }


        /*
         * Checks if username is available for registering.
         */
        function checkUsernameAvailability(username){

            var promise = UserService.checkUsernameAvailable(username);

            promise.success(onCheckUsernameAvailableSuccess);
            promise.error(onCheckUsernameAvailableError);

        }



        /*
         * Checks if username is available for registering.
         */
        function checkRecruiterUsernameAvailability(username){

            var promise = RecruiterService.checkUsernameAvailable(username);

            promise.success(onCheckRecruiterUsernameAvailableSuccess);
            promise.error(onCheckRecruiterUsernameAvailableError);

        }

        /*Promise handlers*/
        function onGetNewMessageCountSuccess(response) {
            vm.userStats.newMessageCount = response.newMessageCount;
            vm.newMessageCount = response.newMessageCount;
        }

        function onGetNewMessageCountError(err) {
            vm.error = "Could not fetch message count. " + err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }
        function onFetchStatsSuccess(response) {

            console.log(response)
            vm.userStats.recruiterCount = response.recruiterCount;
            vm.userStats.userCount = response.userCount;
        }

        function onFetchStatsError(err) {
            vm.error = err;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }



        function onLogoutSuccess(response) {
            $location.url("/admin/login");
        }

        function onLogoutError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            } else{
                $location.url("/admin/login");
            }
        }



        /*sets helper message if username is not available.*/
        function onCheckUsernameAvailableSuccess(response) {
            if(response.isAvailable == false){
                vm.checkUsername = "username not available.";
            }
            else{
                vm.checkUsername = "username available";
            }
        }


        /*sets helper message if username availability check failed.*/
        function onCheckUsernameAvailableError(response) {
            vm.checkUsername = null;

        }

        /*redirects to dashboard on successful registration.*/
        function onCreateUserSuccess(response) {

            var user = response;
            vm.createUserSuccess = "User created! User ID:" + user._id;
            fetchStats(vm.aid);
        }


        function onCreateUserFailure(err) {

            vm.createUserError = "Failed to create user. Please try again after sometime.";
        }


        /*sets helper message if username is not available.*/
        function onCheckRecruiterUsernameAvailableSuccess(response) {
            if(response.isAvailable == false){
                vm.checkRecruiterUsername = "username not available.";
            }
            else{
                vm.checkRecruiterUsername = "username available";
            }
        }


        /*sets helper message if username availability check failed.*/
        function onCheckRecruiterUsernameAvailableError(response) {
            vm.checkRecruiterUsername = null;

        }


        function onCreateRecruiterSuccess(response) {

            var recruiter = response;
            vm.createRecruiterSuccess = "Registration Successful! Recruiter id : " + recruiter._id;
            vm.createRecruiterError = null;
            fetchStats(vm.aid);
        }


        function onCreateRecruiterFailure(err) {

            vm.createRecruiterError = "Failed to create recruiter. Please try again after sometime." + err;
            createRecruiterSuccess = null;
        }
    }
})();
