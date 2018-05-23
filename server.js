var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
var multer = require('multer');
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

var post = new mongoose.Schema({
    Title: String,
    Content: String //,
    // Image: { data: Buffer, contentType: String }
}, {
    versionKey: false
});

var volunteeringEntry = mongoose.model("userVolunteering", userVolunteering);
var accountEntry = mongoose.model("userAccount", userAccount);
var postEntry = mongoose.model("posts", post);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/web/Volunteering.html");
});

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
    var data = new accountEntry(req.body);
    data.save()
        .then(item => {
            console.log("User saved to database");
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
        })
        .catch(err => {
            console.log(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

// app.use(multer({ dest: './uploads/',
//     rename: function (fieldname, filename) {
//         return filename;
//     },
// }));

// app.post('/api/picture_upload', function(req,res){
//  var newPic = new pic();
//  newPic.image.data = fs.readFileSync(req.files.userPhoto.path)
//  newPic.image.contentType = 'image/png';
//  newPic.save();
// });

