/**
 * Created by panktibhalani on 4/4/17.
 */

module.exports = function (app) {

    var fs = require('fs');

    app.get("/api/process/job-descriotion/:uid", createDoc);

    function createDoc(req,res) {


        var PythonShell = require('python-shell');

        var options = {
            args: ['https://boards.greenhouse.io/endurance/jobs/645924#.WOL6CxLyto4'],
            scriptPath: __dirname
        };

        PythonShell.run('crawl.py', options, function (err, results) {
            if (err) throw err;
            console.log(results[0]);
        });
    }
}
