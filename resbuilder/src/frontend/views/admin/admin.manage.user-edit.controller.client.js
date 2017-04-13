
(function () {

    angular
        .module("ResumeBuilder")
        .controller("BasicProfileAdminEditController", BasicProfileAdminEditController);

    function BasicProfileAdminEditController($location, $routeParams, UserService, AdminService, MessageService) {

        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.updateUserPassword = updateUserPassword;
            vm.userId = $routeParams['uid'];
            vm.uid = $routeParams['uid'];
            vm.update = update;
            vm.checkUsernameAvailability = checkUsernameAvailability;

            vm.aid = $routeParams['aid'];
            var promise = UserService.findUserById(vm.userId);
            promise.success(onFindUserSuccess);
            promise.error(onFindUserError);

            fetchNewMessageCount(vm.aid);
        }


        init();

        function checkUsernameAvailability(username){

            var promise = UserService.checkUsernameAvailable(username);

            promise.success(onCheckUsernameAvailableSuccess);
            promise.error(onCheckUsernameAvailableError);

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

        function updateUserPassword(uid,newpassword) {
            var promise = AdminService.updateUserPassword(vm.aid,uid,newpassword);

            promise
                .success(passwordUpdated)
                .error(passwordUpdateError)
        }

        function passwordUpdated(response) {

            vm.passwordError = "password Updated Successfully"

        }

        function passwordUpdateError(err) {
            vm.passwordError = "password not Updated Successfully" + err
        }

        function fetchNewMessageCount(adminId) {
            var promise = MessageService.getNewMessageCountByReceiverId(adminId);

            promise.success(onGetNewMessageCountSuccess);
            promise.error(onGetNewMessageCountError);
        }

        function update(user) {


            console.log(user)
            var promise = AdminService.updateUserByAdmin(vm.aid,vm.user);

            promise
                .success(updatedSuccesfully)
                .error(unSuccessfulUpdate)
        }

        function updatedSuccesfully(response) {
            vm.error = "Successfully updated"
            console.log("updated")

        }

        function unSuccessfulUpdate(err) {
            vm.error = "UnSuccessfully updated" + err
        }

        /*---- Promise functions*/
        function onFindUserSuccess(response) {

            vm.user = response;
        }

        function onFindUserError(err) {
            vm.error = "Could not fetch data. Try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }

        /*Promise handlers*/
        function onGetNewMessageCountSuccess(response) {
            vm.newMessageCount = response.newMessageCount;
        }

        function onGetNewMessageCountError(err) {

            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }
    }
})();