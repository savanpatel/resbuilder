
(function () {

    angular
        .module("ResumeBuilder")
        .controller("MessageSendController", MessageSendController);

    function MessageSendController($location, $routeParams, MessageService) {
        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.recruiterId = $routeParams['rid'];
            vm.rid = $routeParams['rid'];
            vm.uid = $routeParams['uid'];
            vm.firstName = $routeParams['firstName'];
            vm.companyName = $routeParams['companyName'];

            vm.message = {
                companyName: vm.companyName,
                receiverId: vm.uid,
                senderId: vm.rid
            };

            vm.sendMessage = sendMessage;

            vm.error = null;
        }

        init();

        function sendMessage(message) {

            var promise = MessageService.createMessage(message);
            promise.success(onCreateMessageSuccess);
            promise.error(onCreateMessageError);
        }


        function onCreateMessageSuccess(response) {

            vm.error = "Send message successfully";
            var redirectUrl = "/recruiter/" + vm.rid + "/dashboard";
            $location.url(redirectUrl);
        }

        function onCreateMessageError(err) {

            vm.error = "Opps! Could not send message. Please try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }

    }

})();