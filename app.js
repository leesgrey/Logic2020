const Express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const path = require('path');

const cors = require('cors');

const keys = require('./config/keys');
require('./models/Students');

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = 'mongodb+srv://csc309Phil:csc309csc309@cluster0-1bsyp.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = "logic2020";

//setup mongoose connection
MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    question_table = database.collection("questions");
    ass_table = database.collection("ass");
    student_table = database.collection("Students");
    console.log("Connected to " + DATABASE_NAME + "!");
});

var app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

require('./routes/questionRoutes')(app)
require('./routes/studentRoutes')(app)
require('./routes/assRoutes')(app)

app.use(Express.static("client"));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/tmpl/index.html'));
});

app.get('/student/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/dashboard.html'))
})

app.get('/practice/:qid', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/tmpl/practice.html'))
})

const PORT = process.env.PORT || 5000

app.listen(PORT)
