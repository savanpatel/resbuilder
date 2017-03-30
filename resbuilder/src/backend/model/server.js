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

    var logger = require('../logger/logger.server');

    // user schema and model
    require('./user/user.schema.server')(app, mongoose);
    var userModelAPI = require('./user/user.model.server')(app, mongoose, logger);


    var api = {
        userModelAPI : userModelAPI,
    };

    return api;
}