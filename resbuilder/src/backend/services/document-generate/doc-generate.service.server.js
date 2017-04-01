/**
 * Created by panktibhalani on 3/31/17.
 */



module.exports = function (app) {


    app.get("/api/generate/doc", createDoc);

    function createDoc(req,res) {

        var officeClippy = require('office-clippy');
        var docx = officeClippy.docx;
        var doc = docx.create();
        var exporter = officeClippy.exporter;

        var title = docx.createText("Pankti Bhalani");
        title.bold();
        var paragraph = docx.createParagraph();
        paragraph.addText(title)
        paragraph.title().center();
        doc.addParagraph(paragraph);

        var info = docx.createText("Boston MA | 857-407-9390 | panktibhalani@gmail.com | https://github.com/pankti11")

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
        var tabStop = docx.createMaxRightTabStop();
        var paragraph = docx.createParagraph().addTabStop(tabStop);
        var leftText = docx.createText("Northeastern University, Boston, MA").bold();
        var rightText = docx.createText("Sept 2016 – Present").tab();
        paragraph.addText(leftText);
        paragraph.addText(rightText);
        var college = docx.createText("College of Computer and Information Science")
        var degree_date = docx.createText("GPA: 3.7/4.0").tab();
        college.break();
        paragraph.addText(college);
        paragraph.addText(degree_date);
        var degree = docx.createText("Candidate for Master of Science in Computer Science")
        degree.break()
        paragraph.addText(degree)
        var course = docx.createText("Relevant Course Work: Algorithms, Information Retrieval,Natural Language Processing, Map Reduce, Web Development, Program Design Paradigm");
        course.break();
        paragraph.addText(course)
        doc.addParagraph(paragraph);

        // Second College
        var paragraph = docx.createParagraph().addTabStop(tabStop);
        var leftText = docx.createText("Dharmsinh Desai University, Gujarat, India").bold();
        var rightText = docx.createText("June 2011 – May 2015").tab();
        paragraph.addText(leftText);
        paragraph.addText(rightText);
        var college = docx.createText("Bachelor of Technology in Computer Engineering")
        var degree_date = docx.createText("GPA: 8.2/10.0").tab();
        college.break();
        paragraph.addText(college);
        paragraph.addText(degree_date);
        var course = docx.createText("Relevant Course Work: Data Structure and Algorithm, Database Management System, Artificial Intelligence, Web Development in .NET, Software Engineering, Data Mining.");
        course.break();
        paragraph.addText(course)
        doc.addParagraph(paragraph);




        // Technical knowledge added
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
        var list_lang = docx.createText("Python, JAVA, C#, PHP, Racket, Objective-C.").tab()
        paragraph.addText(lang);
        paragraph.addText(list_lang);

        //Web Technologies
        var lang = docx.createText("Web Technologies:").bold().break()
        var list_lang = docx.createText("Angular.JS, Node.JS, Express.JS, ASP.NET, HTML, CSS, JavaScript").tab()
        paragraph.addText(lang);
        paragraph.addText(list_lang);

        //software
        var lang = docx.createText("Software:").bold().break()
        var list_lang = docx.createText("Dream-Weaver, Net-Beans, X-Code, Web-Storm, GitHub").tab()
        paragraph.addText(lang);
        paragraph.addText(list_lang);

        //Database
        var lang = docx.createText("Databases and Other Skills:").bold().break()
        var list_lang = docx.createText("SQL, MySQL, MongoDB.").tab()
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

        //First Experience
        var tabStop = docx.createMaxRightTabStop();
        var paragraph = docx.createParagraph().addTabStop(tabStop);
        var leftText = docx.createText("ESSAR POWER, Hazira, India").bold();
        var rightText = docx.createText("Aug 2015 – February 2016").tab();
        paragraph.addText(leftText);
        paragraph.addText(rightText);

        var position = docx.createText("Software Engineer co-op").bold().break();
        paragraph.addText(position);
        doc.addParagraph(paragraph);

        var text = docx.createText("Developed and Designed a Transmission Tower Management System for EPTCL (ESSAR POWER TRANSMISSION COMPANY LIMITED) using technologies C#, ASP.NET, SAP Crystal Reports, Google Maps API, Microsoft SQL Database and Open XML SDK which manages data for technical, legal, land ownership and maintenance details.")
        var paragraph = docx.createParagraph().bullet();
        paragraph.addText(text)
        doc.addParagraph(paragraph);

        var text = docx.createText("Implemented features to export reports to EXCEL, update data through EXCEL, view Tower Location in Google Maps and notify users through email for any updates or insertion in modules.");
        var paragraph = docx.createParagraph().bullet();
        paragraph.addText(text)
        doc.addParagraph(paragraph);

        var text = docx.createText("Corresponded with clients to gather the requirements and an overview of the functionalities for the application.");
        var paragraph = docx.createParagraph().bullet();
        paragraph.addText(text)
        doc.addParagraph(paragraph);





        //Project
        var education = docx.createText("PROJECT")
        education.bold()
        var paragraph = docx.createParagraph()
        paragraph.addText(education).thematicBreak();
        paragraph.heading1();
        doc.addParagraph(paragraph);

        var paragraph = docx.createParagraph();
        var project_name = docx.createText("Search Engine Implementation (Python, NLKT, Beautiful Soup)").bold().break();
        paragraph.addText(project_name);
        doc.addParagraph(paragraph);

        var text = docx.createText("Developed an indexer to store the token of 3000 Documents which were created by crawling websites.")
        var paragraph = docx.createParagraph().bullet();
        paragraph.addText(text)
        doc.addParagraph(paragraph);

        var text = docx.createText("Implemented BM25, cosine and tf-idf similarity model to extract top 100 documents for a query.")
        var paragraph = docx.createParagraph().bullet();
        paragraph.addText(text)
        doc.addParagraph(paragraph);

        var text = docx.createText("Expanded the Query using Pseudo Relevance Model by implementing rocchio algorithm and obtained 20% better search results.")
        var paragraph = docx.createParagraph().bullet();
        paragraph.addText(text)
        doc.addParagraph(paragraph);


        var paragraph = docx.createParagraph();
        var project_name = docx.createText("Road Trip Planer (Python, Google Maps API, JSON, Android)").bold().break();
        paragraph.addText(project_name);
        doc.addParagraph(paragraph);

        var text = docx.createText("Developed a Mobile application by using Android programming and integrating Python, JSON, Google Maps and Geocoding API which recommends different routes based on the vicinity of the traveler’s current location for the Road trip and the relevant places the traveler can visit during the trip.")
        var paragraph = docx.createParagraph().bullet();
        paragraph.addText(text)
        doc.addParagraph(paragraph);

        var paragraph = docx.createParagraph();
        var project_name = docx.createText("Movie Rater (JAVA, POS-Tagger, Senti-word, SQL)").bold().break();
        paragraph.addText(project_name);
        doc.addParagraph(paragraph);

        var text = docx.createText("Researched seven papers to develop the website which rates the movies based on the comments given by the users using Unsupervised Feature Based Sentimental Analysis using JAVA, Pos-Tagger, Senti-Word and SQL.")
        var paragraph = docx.createParagraph().bullet();
        paragraph.addText(text)
        doc.addParagraph(paragraph);

        var fs = require('fs');
        var output = fs.createWriteStream(__dirname + '/new.docx');
        exporter.local(output, doc);
        exporter.express(res, doc, 'template-resume');


    }

}

