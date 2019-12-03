const Express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');



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
    student_table = database.collection("Students");
    console.log("Connected to " + DATABASE_NAME + "!");
});


var app = Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

require('./routes/questionRoutes')(app)
require('./routes/studentRoutes')(app)

app.get('/', (req, res) => {
    res.send({'hi':'hello'})
});


const PORT = process.env.PORT || 5000

app.listen(PORT)

