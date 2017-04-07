/*
*  Project database schema.
*
*/
module.exports = function (app, mongoose) {

    var ProjectSchema = mongoose.Schema({

        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

        title:{type:String, required:true},

        description: {type:String, required:true},

        startDate:{type:String, required:true},

        endDate:{type:String, required:true},

        teammates:[{type:String}],

        technologies:[{type:String}],

        school:{type:String},

        projectUrl:{type:String}

    });
    return ProjectSchema;
}