const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const pjson = require('./package.json');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const mongoURL = process.env.MONGODB_URI_DEV;
let mongoDB = process.env.MONGODB_URI || mongoURL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/posts", require("./routes/post.route"));


app.get('/', function (req, res) {
    let dbState;
    switch(db.readyState) {
        case 0: dbState = "disconnected";
            break;
        case 1: dbState = "connected";
            break;
        case 2: dbState = "connecting";
            break;
        case 3: dbState = "disconnecting";
            break;
    }
    res.send("Hello! Welcome to " + pjson.name + " v" + pjson.version + "<br>Datebase " + db.name + " " + dbState);
});

let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server started on port " + port);
});