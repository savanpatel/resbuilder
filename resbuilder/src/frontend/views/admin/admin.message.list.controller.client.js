
(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminMessageController", AdminMessageController);

    function AdminMessageController($filter, $location, $routeParams, MessageService, AdminService, MessageService) {
        var vm = this;
        var ERROR_REDIRECT = "/unauthorized";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.adminId = $routeParams['aid'];
            vm.aid = $routeParams['aid'];

            vm.formatDate = formatDate;

            vm.success = false;
            vm.messageList = [];
            vm.error = null;

            vm.currentUID = vm.aid;

            vm.selectMessage = selectMessage;
            vm.sendMessage = sendMessage;
            vm.logout = logout;

            fetchMessages();
            fetchNewMessageCount(vm.aid);
        }


        init();


        function fetchNewMessageCount(adminId) {
            var promise = MessageService.getNewMessageCountByReceiverId(adminId);

            promise.success(onGetNewMessageCountSuccess);
            promise.error(onGetNewMessageCountError);
        }

        function logout() {

            var promise = AdminService.logout(vm.aid);

            promise.success(onLogoutSuccess);
            promise.error(onLogoutError);
        }



        function fetchMessages() {
            var promise = MessageService.findMessageBySenderId(vm.adminId);

            promise.success(onFindMessageBySenderIdSuccess);
            promise.error(onFindMessageBySenderIdError);


            var promise2 = MessageService.findMessageByReceiverId(vm.adminId);

            promise2.success(onFindMessageByReceiverIdSuccess);
            promise2.error(onFindMessageByReceiverIdError);
        }


        function sendMessage(replyMessage) {
            var newMessage = {
                message: replyMessage.message,
                senderId: vm.aid,
                receiverId: vm.selectedMessage.senderId,
                subject: "RE: " + vm.selectedMessage.subject,
                isRead:false
            };

            var promise = MessageService.createMessage(newMessage);
            promise.success(onCreateMessageSuccess);
            promise.error(onCreateMessageError);
        }



        function selectMessage(m) {
            vm.selectedMessage = m;
            vm.selectedMessage.isRead = true;
            m.isRead = true;

            // if selected message is not sent by user itself.
            if(m.senderId != vm.uid){
                var promise = MessageService.updateIsReadForMessage(m);

                promise.success(onUpdateIsReadForMessageSuccess);
                promise.error(onUpdateIsReadForMessageError);
            }

        }

        function formatDate(input)
        {
            if(input == null){ return ""; }
            var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');

            return _date.toUpperCase();
        }


        /*---- Promise functions*/
        function onFindMessageByReceiverIdSuccess(response) {
            if(response.length == 0 && vm.messageList == 0){
                vm.error = "No messages!";
            } else{
                vm.error = null;
            }
            for(var m in response) {
                vm.messageList.push(response[m]);
            }
        }

        function onFindMessageByReceiverIdError(err) {
            vm.error = "Could not fetch data. Try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }

        function onFindMessageBySenderIdSuccess(response) {
            if(response.length == 0 && vm.messageList ){
                vm.error = "No messages!";
            } else{
                vm.error = null;
            }
            for(var m in response) {
                vm.messageList.push(response[m]);
            }
        }

        function onFindMessageBySenderIdError(err) {
            vm.error = "Could not fetch data. Try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function onCreateMessageSuccess(response) {
            vm.success = true;
            vm.messageList = [];
            fetchMessages();
        }

        function onCreateMessageError(err) {

            vm.error = "Oh Snap! Could not send message. " + err;
            vm.success = false;
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
        }


        function onUpdateIsReadForMessageSuccess(response){
            // do nothing.
        }


        // do nothing as of now.
        function onUpdateIsReadForMessageError(err) {
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
                $location.url("/admin/login");
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