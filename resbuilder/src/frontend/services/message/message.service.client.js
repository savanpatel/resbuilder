(function() {
    angular
        .module("ResumeBuilder")
        .factory("MessageService", MessageService);

    var MESSAGE_SERVICE_URL = "/api/message";


    function MessageService($http) {


        var api = {
            "createMessage":createMessage,
            "findMessageByReceiverId":findMessageByReceiverId,
            "findMessageBySenderId":findMessageBySenderId,
            "updateIsReadForMessage":updateIsReadForMessage,
            "findMessageById":findMessageById
        };

        return api;

        function createMessage(message)
        {
            var createMessageUrl = MESSAGE_SERVICE_URL;
            return $http.post(createMessageUrl, message);
        }



        /*
         * Finds message by id, returns promise.
         *
         */
        function findMessageById(id) {

            var findMessageByIdUrl = MESSAGE_SERVICE_URL + "/" + id;
            return $http.get(findMessageByIdUrl);
        }





        /*
         * Updates the user with the new user information provided.
         * Returns  promise.
         */
        function updateIsReadForMessage(message) {
            var updateIsReadForMessageUrl = MESSAGE_SERVICE_URL + "/" + message._id;
            return $http.put(updateIsReadForMessageUrl, message);
        }




        /*
         * finds messages for user
         */
        function findMessageBySenderId(senderId) {
            var findMessageBySenderIdUrl = MESSAGE_SERVICE_URL + "/sender/" + senderId;
            return $http.get(findMessageBySenderIdUrl);
        }


        /*
         * finds messages for recruiter
         */
        function findMessageByReceiverId(receiverId) {
            var findMessageByReceiverIdIdUrl = MESSAGE_SERVICE_URL + "/receiver/" + receiverId;
            return $http.get(findMessageByReceiverIdIdUrl);
        }


    }
})();