/*
*  WorkExp database schema.
*
*/
module.exports = function (app, mongoose) {

    var WorkExpSchema = mongoose.Schema({

        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

        jobTitle:{type:String, required:true},

        companyName:{type:String, required:true},

        description: {type:String},

        technologies: [{type:String}],

        startDate:{type:String},

        endDate:{type:String},

        location:{type:String}

    });

    return WorkExpSchema;
}