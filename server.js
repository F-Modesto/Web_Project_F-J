var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multer = require("multer");

var User = require("./user-model");
var passport = require("passport");
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);

var port = 3000;
var app = express();

app.use(express.static('web'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Admin:Admin123@cluster0-anqkh.mongodb.net/H2Oil?retryWrites=true");

//const db = mongoose.connection;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: new MongoStore({ url: "mongodb+srv://Admin:Admin123@cluster0-anqkh.mongodb.net/H2Oil?retryWrites=true" }),
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

var userVolunteering = new mongoose.Schema({
    name: String,
    email: String
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
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.post("/register", (req, res) => {
    var user = new User(req.body);
    user.save()
        .then(item => {
            User.findOne().sort({_id: 1}).exec(function(err, user) {
                if(err) throw err;

                const user_id = user._id;

                req.login(user_id, function(err) {
                    console.log("User saved to database");
                    console.log(req.user);
                    console.log(req.isAuthenticated());
                    res.redirect('/');
                });
            });
            
        })
        .catch(err => {
            console.log(400).send("Unable to save to database");
        });
});

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
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