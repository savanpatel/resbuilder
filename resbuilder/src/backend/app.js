/**
 * Created by savan on 21/2/17.
 */
module.exports = function(app, mongooseAPI, passport) {
    require("./services/user/user.service.server.js")(app, mongooseAPI, passport);
    require("./services/user/project.service.server.js")(app, mongooseAPI);
    require("./services/user/education.service.server.js")(app, mongooseAPI);
    require("./services/user/technicalskillservice.server.js")(app, mongooseAPI);
    require("./services/user/workexp.service.server.js")(app, mongooseAPI);
    require("./services/document-generate/doc-generate.service.server")(app,mongooseAPI);
    require("./services/job-description-keywords/keys-job-description.service.server")(app,mongooseAPI);
    require("./services/display-resume/display-resume.service.server")(app,mongooseAPI);
    require("./services/recruiter/recruiter.service.server")(app,mongooseAPI);
    require("./services/message/message.service.server")(app,mongooseAPI);
    require("./services/user/resume.service.server")(app, mongooseAPI);
    require("./services/admin/admin.service.server")(app,mongooseAPI);

};
