
(function () {

    angular
        .module("ResumeBuilder")
        .controller("AdminMessageController", AdminMessageController);

    function AdminMessageController($filter, $location, $routeParams, MessageService) {
        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.recruiterId = $routeParams['rid'];
            vm.rid = $routeParams['rid'];

            vm.selectedMessage = null;
            vm.messageList = [{
                subject:"Hello Message.",
                dateCreated:"06/05/2017",
                message:"This is long text. Lorem Ipsum isfldstd sasldewc sr sdsd",
                isRead:false
            }];
            vm.formatDate = formatDate;
            vm.selectMessage = selectMessage;

        }


        init();

        function selectMessage(m) {
            vm.selectedMessage = m;
            vm.selectedMessage.isRead = true;
            m.isRead = true;
            /*
              TODO:
              var promise = MessageService.updateIsReadForMessage(m);

            promise.success(onUpdateIsReadForMessageSuccess);
            promise.error(onUpdateIsReadForMessageError);*/

        }

        function formatDate(input)
        {
            if(input == null){ return ""; }
            var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');
            console.log(_date);
            return _date.toUpperCase();
        }
    }
})();