var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('web'));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Admin:Admin123@cluster0-anqkh.mongodb.net/H2Oil?retryWrites=true");

var userVolunteering = new mongoose.Schema({
    name: String,
    email: String,
}, {
    versionKey: false
});

var userAccount = new mongoose.Schema({
    username: String,
    email: String,
    password: String
}, {
    versionKey: false
});

var volunteeringEntry = mongoose.model("userVolunteering", userVolunteering);
var accountEntry = mongoose.model("userAccount", userAccount);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/web/Volunteering.html");
});

app.post("/addEntry", (req, res) => {
    var myData = new volunteeringEntry(req.body);
    myData.save()
        .then(item => {
            res.send("Volunteering entry added");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.post("/register", (req, res) => {
    var myData = new accountEntry(req.body);
    myData.save()
        .then(item => {
            res.send("Account Created");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

function showdata() {
    volunteeringEntry.find({}, function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}
showdata();