const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    qid: String,
    question: String,
    answer: String
});


const question = mongoose.model('Question', QuestionSchema);

module.exports = { question };
