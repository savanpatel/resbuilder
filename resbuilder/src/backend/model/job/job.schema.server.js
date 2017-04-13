/*
 *  User database jobs.
 *
 */
module.exports = function (app, mongoose) {

    var JobSchema = mongoose.Schema({

        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

        companyName:{type:String, required:true},

        jobUrl:{type:String, required:true},

        note:{type:String}

    });

    return JobSchema;
}