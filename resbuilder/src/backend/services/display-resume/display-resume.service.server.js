module.exports = function (app,mongooseAPI) {


    var fs = require('fs');
    app.get("/api/displayResumePDF/:resumeId", checkAuthorizedRequest, displayPDF);
    app.get("/api/displayResumeDOCX/:resumeId", checkAuthorizedRequest, displayDocx);
    app.get("/api/downloadResumePDF/:resumeId", checkAuthorizedRequest, downloadPDF);
    app.get("/api/downloadResumeDOCX/:resumeId", checkAuthorizedRequest, downloadDocx);

    var ResumeModel = mongooseAPI.resumeModelAPI;

    /*Passport related functions*/

    function checkAuthorizedRequest (req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }

    function downloadPDF(req,res) {
        var resumeId = req.params.resumeId;
        if(resumeId == null){
            res.sendStatus(500).send("null resumeId");
            return;
        }

        ResumeModel
            .findResumeById(resumeId)
            .then(function (resume) {
                if(resume == null){
                    res.sendStatus(500).send("null resume");
                    return;
                }
                var presentDir = __dirname + "/../../uploads/pdf/"
                var tempFile= presentDir +resume.filename+'.pdf'
                fs.readFile(tempFile, function (err,data){

                    if(err) {
                        res.send(err);
                    }
                    else{
                        res.setHeader('Content-disposition', 'attachment; filename='+ resume.filename+'.pdf')
                        res.contentType("application/pdf");
                        res.download(tempFile);
                    }
                });
            });


    }

    function downloadDocx(req,res) {

        var resumeId = req.params.resumeId;
        if(resumeId == null){
            res.sendStatus(500).send("null resumeId");
            return;
        }

        ResumeModel
            .findResumeById(resumeId)
            .then(function (resume) {
                if(resume == null){
                    res.sendStatus(500).send("null resume");
                    return;
                }

                var presentDir = __dirname + "/../../uploads/docx/"
                var tempFile= presentDir +resume.filename+'.docx'
                fs.readFile(tempFile, function (err,data){

                    if(err) {
                        res.send(err);
                    }
                    else{
                        res.contentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                        res.download(tempFile)
                    }
                });
            });


    }

    function displayPDF(req,res) {
        var resumeId = req.params.resumeId;
        if(resumeId == null){
            res.sendStatus(500).send("null resumeId");
            return;
        }

        ResumeModel
            .findResumeById(resumeId)
            .then(function (resume) {
                if(resume == null){
                    res.sendStatus(500).send("null resume");
                    return;
                }

                var presentDir = __dirname + "/../../uploads/pdf/"
                var tempFile= presentDir +resume.filename+'.pdf'
                fs.readFile(tempFile, function (err,data){

                    if(err) {
                        res.send(err);
                    }
                    else{
                        res.contentType("application/pdf");
                        res.send(data);
                    }
                });
            });
    }

    function displayDocx(req,res) {
        var resumeId = req.params.resumeId;
        if(resumeId == null){
            res.sendStatus(500).send("null resumeId");
            return;
        }

        ResumeModel
            .findResumeById(resumeId)
            .then(function (resume) {
                if(resume == null){
                    res.sendStatus(500).send("null resume");
                    return;
                }

                var presentDir = __dirname + "/../../uploads/docx/"
                var tempFile= presentDir +resume.filename+'.docx'
                fs.readFile(tempFile, function (err,data){

                    if(err) {
                        res.send(err);
                    }
                    else{
                        res.contentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                        res.send(data);
                    }
                });
            });
    }

}