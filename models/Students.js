const mongoose = require('mongoose');
const { Schema } = mongoose;


const studentSchema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String,
    grades: Array,
    solved: Array
});

mongoose.model('students', studentSchema);