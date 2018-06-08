var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var multer = require('multer');
var session = require('express-session');
var passport = require('passport');

var port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('web'));
app.use(session({secret: 'qwdwegytikjg', resave: false, saveUninitialized: false, /*cookie: { secure: true }*/}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Admin:Admin123@cluster0-anqkh.mongodb.net/H2Oil?retryWrites=true");

app.listen(port, () => {
    console.log("Server listening on port " + port);
});


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

var post = new mongoose.Schema({
    Title: String,
    Content: String
}, {
    versionKey: false
});

var volunteeringEntry = mongoose.model("userVolunteering", userVolunteering);
var accountEntry = mongoose.model("userAccount", userAccount);
var postEntry = mongoose.model("posts", post);

app.get('/Posts', (req,res) => {

    postEntry.find({}, function(err, result) {
    if (err) throw err;
    res.send(result);
 });

});

app.post("/addEntry", (req, res) => {
    var data = new volunteeringEntry(req.body);
    data.save()
        .then(item => {
            console.log("Volunteering Entry saved to database");
            res.redirect('/VolunteeringSuccess.html');
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.post("/register", (req, res) => {
    var data = new accountEntry(req.body);
    data.save()
        .then(item => {
            console.log("User saved to database");
            res.redirect('/RegisterSuccess.html');
        })
        .catch(err => {
            console.log(400).send("Unable to save to database");
        });
});

app.post("/createPost", (req, res) => {
    var data = new postEntry(req.body);
    data.save()
        .then(item => {
            console.log("Post saved to database");
            res.redirect("/Forum.html");
        })
        .catch(err => {
            console.log(400).send("Unable to save to database");
        });
});
