const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  answer: String
});

mongoose.model('questions', userSchema);