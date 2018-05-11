var fs = require('fs');
var data = fs.readFileSync('volunteeringData.json');

console.log(data);

var volunteering = JSON.parse(data);

console.log(volunteering);

const express = require('express');
const app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://JoaoBM:<JoaoBM123>@cluster0-anqkh.mongodb.net/test?retryWrites=true";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

// app.use(express.static('web'));

// app.get('/all', sendResp);

// function sendResp(req,res) {
// 	res.send(volunteering);
// }

// app.get('/add/:entryName/:entryEmail/', addEntry);

// function addEntry(req,res) {

// 	var reqData = req.params;
// 	var name = reqData.entryName;
// 	var email = reqData.entryEmail;

// 	volunteering[name] = email;

// 	var data = JSON.stringify(volunteering, null, 2);

// 	fs.writeFile('volunteeringData.json', data, finished);
// 	function finished() {

// 		console.log('File Saved.');
// 	}
// }