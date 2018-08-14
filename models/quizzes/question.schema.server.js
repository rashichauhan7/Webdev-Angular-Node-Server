const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    title: String,
    points: Number,
    description: String,
    blanks: [],
    true: Boolean,
    choices: [{
        text: String,
        value: String,
        correct: Boolean
    }],
    questionType: {
        type: String,
        enum: ['ESSAY', 'FILL_BLANKS', 'TRUE_FALSE', 'CHOICE']
    }
},{collection: 'question'});