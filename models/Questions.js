const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new mongoose.Schema({
    qid: Int,
    question: String,
    answer: String
});


const question = mongoose.model('questions', QuestionSchema);

module.exports = { question };
