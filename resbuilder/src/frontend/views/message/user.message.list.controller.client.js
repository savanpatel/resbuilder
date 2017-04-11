
(function () {

    angular
        .module("ResumeBuilder")
        .controller("UserMessageListController", UserMessageListController);

    function UserMessageListController($filter, $location, $routeParams, MessageService,ResumeDataService) {
        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.GetResumeData = GetResumeData;

            vm.userId = $routeParams['uid'];
            vm.uid = $routeParams['uid'];

            vm.formatDate = formatDate;
            vm.success = false;
            vm.error = null;
            vm.messageList = [];

            vm.currentUID = vm.uid;

            fetchMessages();
        }


        init();

        function fetchMessages() {
            /*fetch messages for user*/
            var promise = MessageService.findMessageByReceiverId(vm.userId);

            promise.success(onFindMessageByReceiverIdSuccess);
            promise.error(onFindMessageByReceiverIdError);

            /*fetch messages send by user.*/
            var promise2 = MessageService.findMessageBySenderId(vm.userId);

            promise2.success(onFindMessageBySenderIdSuccess);
            promise2.error(onFindMessageBySenderIdError);

            vm.selectMessage = selectMessage;
            vm.sendMessage = sendMessage;
        }

        function sendMessage(replyMessage) {
            var newMessage = {
                message: replyMessage.message,
                senderId: vm.uid,
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



        /*---- Promise functions*/
        function onFindMessageByReceiverIdSuccess(response) {
            if(response.length == 0){
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

        function GetResumeData(url) {

            console.log("vghbjnklm")
            ResumeDataService.setUrl(url);
            $location.url('/user/'+ vm.uid +'/dashboard/resumeData')

        }


        function formatDate(input)
        {
            if(input == null){ return ""; }
            var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
            console.log(_date);
            return _date.toUpperCase();
        }

        function onUpdateIsReadForMessageSuccess(response){
            console.log(response);
            // do nothing.
        }


        // do nothing as of now.
        function onUpdateIsReadForMessageError(err) {
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


        function onFindMessageBySenderIdSuccess(response) {

            if(response.length == 0){
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
    }
})();