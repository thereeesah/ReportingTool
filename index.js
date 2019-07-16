const mongoose = require('mongoose');
var i = 0;

mongoose.connect('mongodb://localhost/test');

const testSchema = new mongoose.Schema( {
        testField: { type: String, required: true }
    }
)

const testModel = mongoose.model('Test', testSchema);

const addTestObject = async () => {
    try {
        const newTest = new testModel({ testField: "Hello World!"});
        await newTest.save().exec();
    } catch (err) {
        console.log(err.message);
    }
}

async function getTestObjects() {
    try {
        const testObjects = await testModel.find().exec();
        //console.log(testObjects[0].testField);

        for (i = 0; i < testObjects.length; i++) {
            console.log("object number: " + i + " | object itself: " + testObjects[0].testField);

        }

        console.log("im good");
        mongoose.disconnect('mongodb://localhost/test');
        
    } catch (error) {
        
        console.log(error.message);
    }
}

addTestObject();
getTestObjects();

console.log("im done");

var http = require('http');

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

console.log("listewning 8080");