module.exports = app => {

    app.post('/api/question', createQuestion);
    app.get('/api/question', findAllQuestions);
    app.get('/api/question/:qid', findQuestionById);
    app.put('/api/question/:qid', updateQuestion);

    var questionModel = require('../models/quizzes/question.model.service');

    function createQuestion(req,res) {
        questionModel.createQuestion(req.body)
            .then(
                question => res.json(question),
                error => res.send(error)
            )
    }

    function findAllQuestions(req, res) {
        questionModel.findAllQuestions()
            .then(questions => res.send(questions))
    }

    function findQuestionById(req, res) {
        questionModel.findQuestionById(req.params['qid'])
            .then(question => res.send(question))
    }

    function updateQuestion(req, res) {
        questionModel.updateQuestion(req.params['qid'], req.body)
            .then(question => res.send(question))

    }
}