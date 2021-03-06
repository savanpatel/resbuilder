/*
*  Project database schema.
*
*/
module.exports = function (app, mongoose) {

    var RecruiterSchema = mongoose.Schema({

        companyname:{type:String, required:true},

        username:{type:String, required:true},

        password:{type:String, required:true},

        website: {type:String},

        email:{type:String},

        is_deleted:{type:Boolean,required:true,default:false},

        /* description about the company*/
        description:{type:String, required:true}
    });

    return RecruiterSchema;
}