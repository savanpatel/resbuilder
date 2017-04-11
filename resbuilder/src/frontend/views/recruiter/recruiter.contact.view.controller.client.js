
(function () {

    angular
        .module("ResumeBuilder")
        .controller("RecruiterContactController", RecruiterContactController);

    function RecruiterContactController($location, $routeParams, AdminService, MessageService, RecruiterService) {

        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.recruiterId = $routeParams['rid'];
            vm.rid = $routeParams['rid'];
            vm.currentUID = vm.rid;
            vm.adminId = null;

            vm.sendMessage = sendMessage;
            vm.logout = logout;

            getAdminInfo();


        }


        init();



        function logout() {

            var promise = RecruiterService.logout(vm.recruiterId);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }

        function getAdminInfo() {

            var promise = AdminService.getAdminInfo();
            promise.success(onGetAdminInfoSuccess);
            promise.error(onGetAdminInfoError);
        }

        function sendMessage() {

            if(null != vm.feedback && null != vm.feedback.subject &&
                null!= vm.feedback.message && vm.adminId)
            var newMessage = {
                senderId: vm.currentUID,
                receiverId: vm.adminId,
                subject: vm.feedback.subject,
                message: vm.feedback.message
            };

            var promise = MessageService.createMessage(newMessage);
            promise.success(onSendFeedbackMessageSuccess);
            promise.error(onSendFeedbackMessageError);

        }




        function onGetAdminInfoSuccess(response) {

            vm.adminId = response.adminId;
        }

        function onGetAdminInfoError(err) {

            vm.adminId = null;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }

        }

        function onSendFeedbackMessageSuccess(response) {
            vm.success = true;
            vm.error = null;
        }


        function onSendFeedbackMessageError(err) {

            vm.error = "Oh Snap! Could not send message. " + err;
            vm.success = false;

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