/*
*  User database schema.
*
*/
module.exports = function (app, mongoose) {

    var EducationSchema = mongoose.Schema({

        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

        school:{type:String, required:true},

        startYear:{type:Number, required:true},

        endYear:{type:Number, required:true},

        courses:[{type:String}],

        degree:{type:String},

        field:{type:String},

        grade:{type:Number}

    });

    return EducationSchema;
}