module.exports = function (app,mongooseAPI) {


    var fs = require('fs');
    app.get("/api/displayResumePDF/:resumeId", displayPDF);
    app.get("/api/displayResumeDOCX/:resumeId",displayDocx);
    app.get("/api/downloadResumePDF/:resumeId",downloadPDF);
    app.get("/api/downloadResumeDOCX/:resumeId",downloadDocx);

    var ResumeModel = mongooseAPI.resumeModelAPI;


    function downloadPDF(req,res) {
        console.log("download PDF")
        console.log("gvhbjnk")
        var resumeId = req.params.resumeId;
        console.log(resumeId)
        if(resumeId == null){
            res.sendStatus(500).send("null resumeId");
            return;
        }

        ResumeModel
            .findResumeById(resumeId)
            .then(function (resume) {
                console.log(resume)
                if(resume == null){
                    res.sendStatus(500).send("null resume");
                    return;
                }

                var tempFile= '/Users/panktibhalani/project/resbuilder/resbuilder/src/backend/uploads/pdf/'+resume.filename+'.pdf'
                fs.readFile(tempFile, function (err,data){

                    if(err) {
                        res.send(err);
                    }
                    else{
                        console.log(tempFile)
                        res.setHeader('Content-disposition', 'attachment; filename='+ resume.filename+'.pdf')
                        res.contentType("application/pdf");
                        res.download(tempFile);
                    }
                });
            });


    }

    function downloadDocx(req,res) {

        var resumeId = req.params.resumeId;
        console.log(resumeId)
        if(resumeId == null){
            res.sendStatus(500).send("null resumeId");
            return;
        }

        ResumeModel
            .findResumeById(resumeId)
            .then(function (resume) {
                console.log(resume)
                if(resume == null){
                    res.sendStatus(500).send("null resume");
                    return;
                }

                var tempFile= '/Users/panktibhalani/project/resbuilder/resbuilder/src/backend/uploads/docx/'+resume.filename+'.docx'
                fs.readFile(tempFile, function (err,data){

                    if(err) {
                        console.log("error")
                        console.log(err)
                        res.send(err);
                    }
                    else{
                        console.log(tempFile)
                        res.contentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                        res.download(tempFile)
                    }
                });
            });


    }

    function displayPDF(req,res) {
        console.log("gvhbjnk")
        var resumeId = req.params.resumeId;
        console.log(resumeId)
        if(resumeId == null){
            res.sendStatus(500).send("null resumeId");
            return;
        }

        ResumeModel
            .findResumeById(resumeId)
            .then(function (resume) {
                console.log(resume)
                if(resume == null){
                    res.sendStatus(500).send("null resume");
                    return;
                }

                var tempFile= '/Users/panktibhalani/project/resbuilder/resbuilder/src/backend/uploads/pdf/'+resume.filename+'.pdf'
                fs.readFile(tempFile, function (err,data){

                    if(err) {
                        console.log("error")
                        console.log(err)
                        res.send(err);
                    }
                    else{
                        console.log(tempFile)
                        res.contentType("application/pdf");
                        res.send(data);
                    }
                });
            });
    }

    function displayDocx(req,res) {
        var resumeId = req.params.resumeId;
        console.log(resumeId)
        if(resumeId == null){
            res.sendStatus(500).send("null resumeId");
            return;
        }

        ResumeModel
            .findResumeById(resumeId)
            .then(function (resume) {
                console.log(resume)
                if(resume == null){
                    res.sendStatus(500).send("null resume");
                    return;
                }

                var tempFile= '/Users/panktibhalani/project/resbuilder/resbuilder/src/backend/uploads/docx/'+resume.filename+'.docx'
                fs.readFile(tempFile, function (err,data){

                    if(err) {
                        console.log("error")
                        console.log(err)
                        res.send(err);
                    }
                    else{
                        console.log(tempFile)
                        res.contentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                        res.send(data);
                    }
                });
            });
    }

}