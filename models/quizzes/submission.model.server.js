const mongoose = require('mongoose')
const schema = require('./submission.schema.server');
const model = mongoose.model('SubmissionModel', schema);

createSubmission = submission =>
    model.create(submission)

findAllSubmissions = () =>
    model.find()

findAllSubmissionsForStudent = studentId =>
    model.find({student: studentId})
        .populate('answers')
        .populate('student')
        .populate('quiz')
        .exec()

findAllSubmissionsForQuiz = quizId =>
    model.find({quiz: quizId})
        .populate('answers')
        .populate('student')
        .populate('quiz')
        .exec()


findSubmissionById = sid =>
    model.findById(sid)
        .populate('answers')
        .populate('answers.question')
        .populate('student')
        .populate('quiz')
        .exec()

module.exports = {
    createSubmission, findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findSubmissionById
}