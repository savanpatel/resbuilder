
(function () {

    angular
        .module("ResumeBuilder")
        .controller("MessageListController", MessageListController);

    function MessageListController($filter, $location, $routeParams, MessageService) {
        var vm = this;
        var ERROR_REDIRECT = "/";
        var ERR_401 = "Unauthorized";

        function init() {

            vm.recruiterId = $routeParams['rid'];
            vm.rid = $routeParams['rid'];

            vm.formatDate = formatDate;

            var promise = MessageService.findMessageByRecruiterId(vm.recruiterId);

            promise.success(onFindMessageByRecruiterIdSuccess);
            promise.error(onFindMessageByRecruiterIdError);
        }


        init();




        /*---- Promise functions*/
        function onFindMessageByRecruiterIdSuccess(response) {

            vm.messageList = response;
        }

        function onFindMessageByRecruiterIdError(err) {
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
    }
})();