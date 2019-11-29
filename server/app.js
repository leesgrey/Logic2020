// const express = require('express');
// // const MongoClient = require('mongodb').MongoClient;
// const mongoose = require('mongoose');


// const uri = "mongodb+srv://csc309Phil:csc309csc309@cluster0-1bsyp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect()

// // mongoose.Promise = global.Promise;
// // mongoose.connect('mongodb+srv://csc309Phil:csc309csc309@cluster0-1bsyp.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });


// // Create a new Express application.
// const app = express();
// require('./routes/questionRoutes')(app);




// const PORT = process.env.PORT || 8000;
// app.listen(PORT);

const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


const CONNECTION_URL = 'mongodb+srv://csc309Phil:csc309csc309@cluster0-1bsyp.mongodb.net/test?retryWrites=true&w=majority';
const DATABASE_NAME = "logic2020";

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database

app.listen(8000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        question_table = database.collection("questions");
        student_table = database.collection("students");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

app.get("/questions", (request, response) => {
    question_table.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//Sends answer when 
app.get('/questions/:id', (request, response) => {
    question_table.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send({"answer": result.answer});
    });


})