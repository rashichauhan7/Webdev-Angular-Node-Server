module.exports = app => {
    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid',deleteQuiz);


    const quizModel = require('../models/quizzes/quiz.model.server');

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
}