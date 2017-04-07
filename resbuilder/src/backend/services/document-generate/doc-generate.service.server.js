/**
 * Created by panktibhalani on 3/31/17.
 */



module.exports = function (app,mongooseAPI) {

    var fs = require('fs');
    var Promise = require('es6-promise').Promise;
    var officeClippy = require('office-clippy');
    var docx = officeClippy.docx;
    var doc = docx.create();
    var userId;
    var exporter = officeClippy.exporter;
    var data;
    var ResumeModel = mongooseAPI.resumeModelAPI;

    app.post("/api/generateResume/:uid", createDoc);

    function createDoc(req, res) {


        userId = req.params.uid;
        data = req.body;
        var promise = createDocHelper();

        promise
            .then(getlength)
            .then(sleepthread)
            .then(createPDF)
            .then(function () {


            })
    }

    function getlength() {

        ResumeModel.findResumeDOCXforUser(userId,function (pdfs) {



        })

    }

    function sleepthread() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve()
            },2000)
        });
    }

    function createDocHelper() {

        return new Promise(function (resolve,reject) {


            console.log(data)
            var title = docx.createText(data['user']['firstName'] + " " + data['user']['lastName']);
            title.bold();
            var paragraph = docx.createParagraph();
            paragraph.addText(title)
            paragraph.title().center();
            doc.addParagraph(paragraph);

            var info = docx.createText(data['user']['contact'] + " | " + data['user']['email']+ " | " +data['user']['githubUrl'])

            var paragraph = docx.createParagraph()
            paragraph.addText(info);
            paragraph.center().thematicBreak();
            doc.addParagraph(paragraph);

            // Education added

            var education = docx.createText("EDUCATION")
            education.bold()
            var paragraph = docx.createParagraph()
            paragraph.addText(education).thematicBreak();
            paragraph.heading1();
            doc.addParagraph(paragraph);

                // First College

            for(var i=0;i<data['education'].length;i++)
            {
                var tabStop = docx.createMaxRightTabStop();
                var paragraph = docx.createParagraph().addTabStop(tabStop);
                var leftText = docx.createText(data['education'][i]['school']).bold();
                var rightText = docx.createText(data['education'][i]['startYear'] +" – " + data['education'][i]['endYear']).tab();
                paragraph.addText(leftText);
                paragraph.addText(rightText);
                var college = docx.createText(data['education'][i]['degree'] + " in "+ data['education'][i]['field'])
                var degree_date = docx.createText("GPA: "+data['education'][i]['grade']).tab();
                college.break();
                paragraph.addText(college);
                paragraph.addText(degree_date);
                var course = docx.createText("Relevant Courses: "+data['education'][i]['courses'].join(", "));
                course.break();
                paragraph.addText(course)
                doc.addParagraph(paragraph);
            }

            console.log("education done")

            var education = docx.createText("TECHNICHAL KNOWLEGDE")
            education.bold()
            var paragraph = docx.createParagraph()
            paragraph.addText(education).thematicBreak();
            paragraph.heading1();
            doc.addParagraph(paragraph);


            var tabStop = docx.createLeftTabStop(2700);
//Languages
            var paragraph = docx.createParagraph().addTabStop(tabStop);
            var lang = docx.createText("Languages:").bold()
            var list_lang = docx.createText(data['technical']['languages'].join(", ")).tab();
            paragraph.addText(lang);
            paragraph.addText(list_lang);


            console.log("languages");
//
//Web Technologies
            var lang = docx.createText("Web Technologies:").bold().break()
            var list_lang = docx.createText(data['technical']['technologies'].join(", ")).tab();
            paragraph.addText(lang);
            paragraph.addText(list_lang);

// //software
            var lang = docx.createText("Software:").bold().break()
            var list_lang = docx.createText(data['technical']['softwares'].join(",")).tab();
            paragraph.addText(lang);
            paragraph.addText(list_lang);


//Database

            var lang = docx.createText("Software:").bold().break()
            var list_lang = docx.createText(data['technical']['database'].join(",")).tab();
            paragraph.addText(lang);
            paragraph.addText(list_lang);
            doc.addParagraph(paragraph)

            //Work Experience
            var education = docx.createText("WORK EXPERIENCE")
            education.bold()
            var paragraph = docx.createParagraph()
            paragraph.addText(education).thematicBreak();
            paragraph.heading1();
            doc.addParagraph(paragraph);
            //
            console.log("work Experience")

            for(var j1=0;j1<data['work'].length;j1++)
            {
                console.log(j1)
                var tabStop = docx.createMaxRightTabStop();
                var paragraph = docx.createParagraph().addTabStop(tabStop);
                var leftText = docx.createText(data['work'][j1]['companyName']+", " + data['work'][j1]['location']).bold();
                var rightText = docx.createText(data['work'][j1]['startDate']+ " – " + data['work'][j1]['endDate']).tab();
                paragraph.addText(leftText);
                paragraph.addText(rightText);
                console.log(data['work'][j1]['companyName']+", " + data['work'][j1]['location'])
                console.log(data['work'][j1]['startDate']+ " – " + data['work'][j1]['endDate'])

                var position = docx.createText(data['work'][j1]['jobTitle']).bold().break();
                paragraph.addText(position);
                doc.addParagraph(paragraph);

                var listDes = data['work'][j1]['description'].split("\n")
                console.log(listDes)

                for(var k =0;k<listDes.length;k++)
                {
                    var text = docx.createText(listDes[k]);
                    var paragraph = docx.createParagraph().bullet();
                    paragraph.addText(text)
                    doc.addParagraph(paragraph);

                }
            }


            console.log("project")
            //Project
            var education = docx.createText("PROJECT")
            education.bold()
            var paragraph = docx.createParagraph()
            paragraph.addText(education).thematicBreak();
            paragraph.heading1();
            doc.addParagraph(paragraph);


            for(var j =0;j<data['project'].length;j++)
            {
                console.log(j);
                var paragraph = docx.createParagraph();
                var project_name = docx.createText(data['project'][j]['title']+ " (" + data['project'][j]['technologies'].join(" ")+")").bold().break();
                paragraph.addText(project_name);
                doc.addParagraph(paragraph);

                var proDes = data['project'][j]['description'].split("\n")
                console.log(proDes)
                for(var k=0;k<proDes.length;k++)
                {
                    var text = docx.createText(proDes[k])
                    var paragraph = docx.createParagraph().bullet();
                    paragraph.addText(text)
                    doc.addParagraph(paragraph);
                }

            }

            var output = fs.createWriteStream(__dirname + '/../../uploads/docx/new.docx');
            exporter.local(output, doc);
            resolve()

        });

    }

        //exporter.express(res, doc, 'template-resume');

    function createPDF() {

        return new Promise(function (resolve) {

            console.log("fghjkl")
            var req = require('request');

            req = req.defaults({
                agent: false
            });


            function a(buf, callback) {
                console.log("hello2")
                var r = req.post('http://mirror1.convertonlinefree.com', {
                    encoding: null,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36'
                    }
                }, function (err, res) {
                    if (err) return callback(err);

                    callback(null, res.body);
                });

                var form = r.form();
                form.append('__EVENTTARGET', '');
                form.append('__EVENTARGUMENT', '');
                form.append('__VIEWSTATE', '');
                form.append('ctl00$MainContent$fu', buf, {
                    filename: 'output.docx',
                    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                });
                form.append('ctl00$MainContent$btnConvert', 'Convert');
                form.append('ctl00$MainContent$fuZip', '');
            };

            a(fs.readFileSync(__dirname + '/../../uploads/docx/new.docx'), function (err, data) {
                fs.writeFileSync(__dirname+"/../../uploads/pdf/test.pdf", data);
                resolve()
            });
        });


    }
}
