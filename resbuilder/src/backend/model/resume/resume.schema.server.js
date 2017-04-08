/*
 *  Resume database schema.
 *
 */
module.exports = function (app, mongoose) {

    var ResumeSchema = mongoose.Schema({

        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

        filename:{type:String,required:true}

    });

    return ResumeSchema;
}