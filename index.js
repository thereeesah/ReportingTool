const mongoose = require('mongoose');
var i = 0;

var Venture_Name_List;
var Contact_List;
var Website_List;
var OneLiner_List;
var Description_List;

mongoose.connect('mongodb://localhost/test');

const ReportTest = new mongoose.Schema( {
        Venture_Name: { type: String, required: true },
        Contact: {type: String, required: true},
        Website: {type: String, required: true},
        OneLiner: {type: String, required: true},
        Description: {type: String, required: true}
    }
)

const testModel = mongoose.model('Test', ReportTest);

const addTestObject = async () => {
    try {
        const newTest = new testModel({ Venture_Name: "Tesla", Contact: "tesla@gmail.com", Website: "www.tesla.com", OneLiner: "For a sustainable future", Description: "A company for xxx"});
        await newTest.save().exec();
    } catch (err) {
        console.log(err.message);
    }
}

async function getTestObjects() {
    try {
        const testObjects = await testModel.find().exec();
        //console.log(testObjects[0].Venture_Name);

        for (i = 0; i < testObjects.length; i++) {
            console.log("object number: " + i + " | object itself: " + testObjects[i].Venture_Name + " " + testObjects[i].Contact + " " + testObjects[i].Website + " " + testObjects[i].OneLiner + " " + testObjects[i].Description + " ");
            Venture_Name_List.push(testObjects[i].Venture_Name);
            Contact_List.push(testObjects[i].Contact);
            Website_List.push(testObjects[i].Website);
            OneLiner_List.push(testObjects[i].OneLiner);
            Description_List.push(testObjects[i].Descriptiion);
        }

        console.log("Attaining Objects Complete");
        mongoose.disconnect('mongodb://localhost/test');
        
    } catch (error) {
        
        console.log(error.message);
    }
}

// //TODO: await function does not know how to turn off; not synced with PDF report

addTestObject();
getTestObjects();

// Attempting to write in an HTML document
/*var http = require('http');

var fileSystem = require('fs');

var server = http.createServer(function(req, resp){
	fileSystem.readFile('./index.html', function(error, fileContent){
		if(error){
			resp.writeHead(500, {'Content-Type': 'text/plain'});
			resp.end('Error');
		}
		else{
			resp.writeHead(200, {'Content-Type': 'text/html'});
			resp.write(fileContent);
			resp.end();
		}
	});
});

server.listen(8080);

console.log("listewning 8080"); */

/****************PDF TESTING*************/

//wait 

const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument;
doc.pipe(fs.createWriteStream('ReportTest.pdf'));

doc.addPage()
    .text('Venture Name:')// + Venture_Name_List)
    .text('Contact:')// + Contact_List)
    .text('Website:')// + Website_List)
    .text('One Liner')// + OneLiner_List)
    .text('Description');// + Description_List);

doc.end();