/*
 * REST API for user services.
 *
 */

module.exports = function (app, mongooseAPI) {

    app.post("/api/message", createMessage);
    app.get("/api/message/:messageId", findMessageById);
    app.put("/api/message/:messageId", updateIsReadForMessage);
    app.get("/api/message/user/:userId", findMessageByUserId);
    app.get("/api/message/recruiter/:recruiterId", findMessageByRecruiterId);



    var MessageModel = mongooseAPI.messageModelAPI;
    
    /*
     *  Handlers
     */

    
    

    /*
     * Handler for POST call /api/user
     */
    function createMessage(req, res) {

        var message = req.body;

        if(null == message){
            req.sendStatus(500).send("null/empty message");
            return;
        }


        // create user in db.
        MessageModel.createMessage(message)
            .then(function (dbMessage){

                if(null == dbMessage){
                    res.sendStatus(500).send("Internal server error.");
                } else {
                    res.send(dbMessage);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
    


    /*
     *
     * Handler for find education by education id.
     *
     */
    function findMessageById(req, res) {

        var messageId = req.params.messageId;


        if(messageId == null){
            res.sendStatus(500).send("null messageId.");
            return;
        }

        MessageModel.findMessageById(messageId)
            .then(function (dbMessage) {

                if(null == dbMessage){
                    // message not found
                    res.send(404);
                }else {
                    // message found.
                    res.send(dbMessage);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    /*
     *
     * Handler for find education by education id.
     *
     */
    function findMessageByUserId(req, res) {

        var userId = req.params.userId;


        if(userId == null){
            res.sendStatus(500).send("null userId.");
            return;
        }

        MessageModel.findMessageByUserId(userId)
            .then(function (dbMessage) {

                if(null == dbMessage){
                    // message not found
                    res.send(404);
                }else {
                    // message found.
                    res.send(dbMessage);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    /*
     *
     * Handler for find education by education id.
     *
     */
    function findMessageByRecruiterId(req, res) {

        var recruiterId = req.params.recruiterId;


        if(recruiterId == null){
            res.sendStatus(500).send("null recruiterId.");
            return;
        }

        MessageModel.findMessageByRecruiterId(recruiterId)
            .then(function (dbMessage) {

                if(null == dbMessage){
                    // message not found
                    res.send(404);
                }else {
                    // message found.
                    res.send(dbMessage);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }



    /*Updates the is read status of message*/
    function updateIsReadForMessage(req, res) {

        var messageId = req.params.messageId;

        var message = req.body;

        if(null == messageId|| null == message||
            "" == messageId || message.isRead == undefined)
        {
            res.sendStatus(500).send("message, messageId or isRead field is null/empty");
            return;
        }

        MessageModel.updateIsReadForMessage(messageId, message.isRead)
            .then(function (count) {

                if(null == count || count == 0){
                    res.sendStatus(500).send("could not update message status.");
                } else {
                    res.send(message);
                }
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }
}