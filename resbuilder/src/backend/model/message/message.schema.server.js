/*
*  Project database schema.
*
*/
module.exports = function (app, mongoose) {

    var MessageSchema = mongoose.Schema({

        subject:{type:String, required:true},

        message:{type:String, required:true},

        companyName:{type:String, required:true},

        userId:{type:String, required:true},

        recruiterId: {type:String},

        jobDescriptionUrl: {type:String, required:true},

        isRead:{type:String, default:false},

        dateCreated: {type:Date, default:Date.now},

    });

    return MessageSchema;
}