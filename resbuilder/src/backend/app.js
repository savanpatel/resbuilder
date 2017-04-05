/**
 * Created by savan on 21/2/17.
 */
module.exports = function(app, mongooseAPI) {
    require("./services/user.service.server.js")(app, mongooseAPI);
    require("./services/project.service.server.js")(app, mongooseAPI);
    require("./services/education.service.server.js")(app, mongooseAPI);
    require("./services/technicalskillservice.server.js")(app, mongooseAPI);
    require("./services/workexp.service.server")(app, mongooseAPI);
    require("./services/document-generate/doc-generate.service.server")(app);
    require("./services/job-description-keywords/keys-job-description.service.server")(app,mongooseAPI);
    /*require("./services/website.service.server.js")(app, mongooseAPI);
    require("./services/page.service.server.js")(app, mongooseAPI);
    require("./services/widget.service.server.js")(app, mongooseAPI);*/
};
