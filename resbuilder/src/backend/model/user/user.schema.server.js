/*
*  User database schema.
*
*/
module.exports = function (app, mongoose) {

    var UserSchema = mongoose.Schema({

        username:{type:String, required:true},

        password:{type:String, required:true},

        firstName:{type:String, required:true},

        lastName:{type:String, required:true},

        email:{type:String, required:true},

        address:{type:String},

        contact:{type:Number},

        githubUrl:{type:String},

        personalWebsite:{type:String},

        isPublic:{type:Boolean}
    });

    return UserSchema;
}