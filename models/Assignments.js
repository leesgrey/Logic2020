const mongoose = require('mongoose');
const { Schema } = mongoose;


const QuestionSchema = new mongoose.Schema({
    qid: Int,
    question: String,
    answer: String
});

const AssSchema = new mongoose.Schema({
    aid: Int,
    name: String,
    questions: [QuestionSchema]
});


const question = mongoose.model('ass', AssSchema);

module.exports = { question };
