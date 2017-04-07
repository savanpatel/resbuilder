module.exports = function (app,mongooseAPI) {


    app.get("/api/displayResumePDF/:resumeId", displayPDF);
  //  app.get("/api/displayResumeDOCX/:resumeId",displayDocx)

    var ResumeModel = mongooseAPI.resumeModelAPI;
    function displayPDF(req,res) {

        // var resumeId = req.params.resumeId;
        // var tempFile="/home/applmgr/Desktop/123456.pdf";
        // fs.readFile(tempFile, function (err,data){
        //     res.contentType("application/pdf");
        //     res.send(data);





    }

}