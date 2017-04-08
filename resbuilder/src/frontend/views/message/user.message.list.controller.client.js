
(function () {

    angular
        .module("ResumeBuilder")
        .controller("UserMessageListController", UserMessageListController);

    function UserMessageListController($filter, $location, $routeParams, MessageService) {
        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.userId = $routeParams['uid'];
            vm.uid = $routeParams['uid'];

            vm.formatDate = formatDate;

            var promise = MessageService.findMessageByUserId(vm.userId);

            promise.success(onFindMessageByUserIdSuccess);
            promise.error(onFindMessageByUserIdError);

            vm.selectMessage = selectMessage;
        }


        init();

        function selectMessage(m) {
            vm.selectedMessage = m;
            vm.selectedMessage.isRead = true;
            m.isRead = true;
            var promise = MessageService.updateIsReadForMessage(m);

            promise.success(onUpdateIsReadForMessageSuccess);
            promise.error(onUpdateIsReadForMessageError);

        }



        /*---- Promise functions*/
        function onFindMessageByUserIdSuccess(response) {

            vm.messageList = response;
        }

        function onFindMessageByUserIdError(err) {
            vm.error = "Could not fetch data. Try after sometime.";
            if(err == ERR_401){
                $location.url(ERROR_REDIRECT);
            }
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
    }
})();