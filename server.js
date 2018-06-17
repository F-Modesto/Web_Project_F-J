var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multer = require("multer");
var hbs = require("express-handlebars");

var User = require("./user-model");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var session = require("express-session");
var bcrypt = require("bcrypt");

var port = 3000;
var app = express();

app.use(express.static('web'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine("hbs", hbs({
	extname: '.hbs',
	defaultLayout: 'layout',
	partialDir: __dirname + '/views/partials', 
	layoutDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://Admin:Admin123@cluster0-anqkh.mongodb.net/H2Oil?retryWrites=true");

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	res.locals.isAuthenticated = req.isAuthenticated();
	next();
});

app.listen(port, () => {
	console.log("Server listening on port " + port);
});

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//-------------------------------MONGOOSE------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

var userVolunteering = new mongoose.Schema({
	name: String,
	email: String
}, {
	versionKey: false
});

var post = new mongoose.Schema({
	Title: String,
	Content: String,
	Date: {
		type: Date,
		default: Date.now()
	}}, {
	versionKey: false
});

var news = new mongoose.Schema({
	Title: String,
	Content: String,
	Link: String,
	Date: {
		type: Date,
		default: Date.now()
	}}, {
	versionKey: false
});

var profile = new mongoose.Schema({
	description: String,
	profileId: String
}, {
	versionKey: false
});

var volunteeringEntry = mongoose.model("userVolunteering", userVolunteering);
var postEntry = mongoose.model("posts", post);
var newsEntry = mongoose.model("news", news);
var profileEntry = mongoose.model("profiles", profile);
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------ROUTES------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

app.get('/', function(req, res) {
	res.render('index', { title: "Home", active: {Forum: false, News: false, Login: false, Register: false, Profile: false}});
});

app.get('/Forum', function(req, res) {
	postEntry.find({}).sort('-Date').exec(function(err, content) {
		if (err) throw err;
		res.render('Forum', { title: "Forum", active: {Forum: true, News: false, Login: false, Register: false, Profile: false}, contents: content});
	});
});

app.get('/News', function(req, res) {
	newsEntry.find({}).sort('-Date').exec(function(err, content) {
		if (err) throw err;
		res.render('News', { title: "News", active: {Forum: false, News: true, Login: false, Register: false, Profile: false}, contents: content});
	});
});

app.get('/createPost', function(req, res) {
	res.render('createPost', { title: "Create Post", active: {Forum: true, News: false, Login: false, Register: false, Profile: false}});
});

app.get('/createNews', function(req, res) {
	res.render('createNews', { title: "Create News Article", active: {Forum: false, News: true, Login: false, Register: false, Profile: false}});
});

app.get('/Login', function(req, res) {
	res.render('Login', { title: "Login", active: {Forum: false, News: false, Login: true, Register: false, Profile: false}});
});

app.get('/Register', function(req, res) {
	res.render('Register', { title: "Register", active: {Forum: false, News: false, Login: false, Register: true, Profile: false}});
});

app.get('/ProfileSetup', function(req, res) {
	res.render('ProfileSetup', { title: "Setup User Profile", active: {Forum: false, News: false, Login: false, Register: true, Profile: false}});
});

app.get('/Logout', function(req, res, next) {
	req.logout() ;
	req.session.destroy(() => { 
		res.clearCookie('connect.sid');
		res.redirect('/');
	});
})﻿;

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//--------------------------USER AUTHENTICATION------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------

app.get('/Profile', authenticationMiddleware(), function(req, res) {
	res.render('Profile', { title: "Profile", active: {Forum: false, News: false, Login: false, Register: false, Profile: true}, profileDescription: req.user._id});
});

app.post("/Login", passport.authenticate(
	'local', {
		successRedirect: '/',
		failureRedirect: '/Login'
}));

passport.use(new LocalStrategy(
	{usernameField:"username", passwordField:"password"}, function(username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) return done(err);

	        if (!user) return done(null, false);

	        const hash = user.password;
	        const userId = user._id;

			bcrypt.compare(password, hash, function(err, response) {
				if(response === true) {
					return done(null, {user_id: userId });
				} else{
					return done(null, false);
				}
			});
		});
	}
));

app.post("/register", (req, res) => {
	var user = new User(req.body);
	user.save()
	.then(item => {
		User.findOne().sort({_id: 1}).exec(function(err, user) {
			if(err) throw err;

			const user_id = user._id;

			req.login(user_id, function(err) {
				res.redirect('/Profile');
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

function authenticationMiddleware() {  
	return (req, res, next) => {
		if (req.isAuthenticated()) return next();
		res.redirect('/Login');
	}
}

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//----------------------------------POSTS------------------------------------
//---------------------------------------------------------------------------
//--------------------------------------------------------------------------- 

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

app.post("/createPost", (req, res) => {
	var data = new postEntry({Title: req.body.Title, Content: req.body.Content});
	data.save()
	.then(item => {
		console.log("Post saved to database");
		res.redirect("/Forum");
	})
	.catch(err => {
		console.log(400).send("Unable to save to database");
	});
});

app.post("/createNews", (req, res) => {
	var data = new newsEntry({Title: req.body.Title, Content: req.body.Content, Link:"//" + req.body.Link});
	data.save()
	.then(item => {
		console.log("News saved to database");
		res.redirect("/News");
	})
	.catch(err => {
		console.log(400).send("Unable to save to database");
	});
});

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//--------------------------------PROFILE------------------------------------
//---------------------------------------------------------------------------
//--------------------------------------------------------------------------- 

app.post("/ProfileSetup", (req, res) => {
	User.findOne().sort({_id: 1}).exec(function(err, user) {
		if(err) throw err;

		const userId_ = user._id;
		var data = new profileEntry({description: req.body.description, profileId: userId_});
		data.save()
		.then(item => {
		res.redirect("/Profile");
		})
		.catch(err => {
			res.status(400).send("Unable to save to database");
		});
	});
});