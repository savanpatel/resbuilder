module.exports = function (app) {


    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);
    var logger = require('../logger/logger.server')(app);

    require('./user/user.schema.server')(app, mongoose);
    var userModelAPI = require('./user/user.model.server')(app, mongoose, logger);

    require('./project/project.schema.server')(app, mongoose);
    var projectModelAPI = require('./project/project.model.server')(app, mongoose, logger);

    require('./technicalSkill/technicalSkill.schema.server')(app, mongoose);
    var technicalSkillModelAPI = require('./technicalSkill/technicalSkill.model.server')(app, mongoose, logger);

    require('./education/education.schema.server')(app, mongoose);
    var educationModelAPI = require('./education/education.model.server')(app, mongoose, logger);

    require('./workexp/workexp.schema.server')(app, mongoose);
    var workExpModelAPI = require('./workexp/workexp.model.server')(app, mongoose, logger);

    require('./resume/resume.schema.server')(app,mongoose);
    var resumeModelAPI = require('./resume/resume.model.server')(app,mongoose,logger);

    var api = {
        userModelAPI : userModelAPI,
        projectModelAPI:projectModelAPI,
        technicalSkillModelAPI:technicalSkillModelAPI,
        educationModelAPI:educationModelAPI,
        workExpModelAPI:workExpModelAPI,
        resumeModelAPI:resumeModelAPI
    };
    return api;
}