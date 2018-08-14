const mongoose = require('mongoose');
const schema = require('./question.schema.server');
const questionModel = mongoose.model('QuestionModel', schema);

createQuestion = question =>
    questionModel.create(question)

findAllQuestions = () =>
    questionModel.find()

findQuestionById = questionId =>
    questionModel.findById(questionId)

updateQuestion = (questionId, question) =>
    questionModel.update({_id: questionId},
        {
            $set: question
        })

module.exports = {
    createQuestion,
    findAllQuestions,
    findQuestionById,
    updateQuestion,
}