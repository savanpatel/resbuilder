/*
 *  Resume database schema.
 *
 */
module.exports = function (app, mongoose) {

    var ResumeSchema = mongoose.Schema({

        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

        urlPdf:{type:String,required:true},

        urlDocx:{type:String,required:true}

    });

    return ResumeSchema;
}