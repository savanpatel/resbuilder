
(function () {

    angular
        .module("ResumeBuilder")
        .controller("MessageSendController", MessageSendController);

    function MessageSendController($location, $routeParams, MessageService) {
        var vm = this;
        function init() {

            vm.recruiterId = $routeParams['rid'];
            vm.rid = $routeParams['rid'];
            vm.uid = $routeParams['uid'];
            vm.firstName = $routeParams['firstName'];
            vm.companyName = $routeParams['companyName'];

            vm.message = {
                companyName: vm.companyName,
                userId: vm.uid,
                recruiterId: vm.rid
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
        }

    }

})();