
//Getting the Json from a file
var fs = require('fs');
//Why Sync??
var data = fs.readFileSync('games.json');
//raw data
console.log(data);
//parsed data
var games = JSON.parse(data);

console.log(games);

const express = require('express');
const app = express();

app.listen(3000, () => console.log('Example app listening on port 3000!'));

app.use(express.static('web'));

app.get('/all', sendResp);

function sendResp(req,res){
	res.send(games);
}
//get request - With params
app.get('/add/:gameName/:year/', addGame);

function addGame(req,res){

var reqData = req.params;
var game = reqData.gameName;
var year = Number(reqData.year);

games[game] = year;

var data = JSON.stringify(games, null, 2);

fs.writeFile('games.json',data, finished);

function finished(){

	console.log('File Saved.');
}

}
