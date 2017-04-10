/*
*  Project database schema.
*
*/
module.exports = function (app, mongoose) {

    var MessageSchema = mongoose.Schema({

        /* required for all kind of users.*/
        subject:{type:String, required:true},

        /*required for all kind of users.*/
        message:{type:String, required:true},

        /* Not required for admin*/
        companyName:{type:String},

        receiverId:{type:String, required:true},

        senderId: {type:String, required:true},

        /*not required for admin.*/
        jobDescriptionUrl: {type:String},

        /*required*/
        isRead:{type:String, default:false},

        /*required*/
        dateCreated: {type:Date, default:Date.now},

    });

    return MessageSchema;
}