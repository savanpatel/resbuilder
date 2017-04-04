var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/frontend'));

//require ("./test/app.js")(app);
var mongooseAPI = require("./backend/model/server")(app);

require("./backend/app.js")(app, mongooseAPI);

var port = process.env.PORT || 3000;
app.listen(port);

