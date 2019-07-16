const mongoose = require('mongoose');

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
        console.log(testObjects[0].testField);
    } catch (error) {
        
        console.log(error.message);
    }
}

addTestObject();
getTestObjects();

console.log("im done");