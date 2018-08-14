module.exports = app => {
    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid',deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId',addQuestion);
    app.post('/api/quiz/:qid/submission', submitQuiz);
    app.get('/api/quiz/:qid/submission', getSubmissions);
    app.get('/api/quiz/:qid/student/:sid/submission', getSubmissionsForStudent);
    app.get('/api/quiz/:qid/submission/:sid', getSubmission);

    const quizModel = require('../models/quizzes/quiz.model.server');
    const submissionModel = require('../models/quizzes/submission.model.server');

    function findAllQuizzes(req, res) {
        quizModel.findAllQuizzes()
            .then(quiz => res.send(quiz));
    }

    function createQuiz(req, res) {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz));
    }

    function findQuizById(req, res) {
        quizModel.findQuizById(req.params['qid'])
            .then(quiz => res.send(quiz));
    }

    function updateQuiz(req, res) {
        quizModel.updateQuiz(req.params['qid'], req.body)
            .then(quiz => res.send(quiz));
    }

    function deleteQuiz(req, res) {
        quizModel.deleteQuiz(req.params['qid'])
            .then(quiz => res.send(quiz));
    }

    function addQuestion(req, res) {
        quizModel.addQuestion(req.params['qid'], req.params['questionId'])
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }
    function submitQuiz(req, res) {

            let quizId = req.body._id;
            const current_user = req.session['currentUser'];
            const userId = current_user._id;
            let answers = req.body.questions;
            for(var a = 0 ; a < answers.length; a++)
            {
                answers[a].question = answers[a]._id;
            }
            var submission = {
                student: userId,
                quiz: quizId,
                answers: answers,
                timestamp: req.body.timestamp
            }
            submissionModel.createSubmission(submission)
                .then(
                    status => res.send(status),
                    error => res.send(error)
                )
    }

    function getSubmissions(req, res) {
        submissionModel.findAllSubmissionsForQuiz(req.params['qid'])
            .then(submissions => res.send(submissions));
    }

    function getSubmission(req, res) {
        submissionModel.findSubmissionById(req.params['sid'])
            .then(sub => res.send(sub));
    }

    function getSubmissionsForStudent(req, res) {
        const current_user = req.session['currentUser'];
        const userId = current_user._id;
        submissionModel.findAllSubmissionsForStudent(userId, req.params['quizId'])
            .then(submissions => res.send(submissions))
    }
}