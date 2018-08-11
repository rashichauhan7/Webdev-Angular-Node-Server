module.exports = app => {
    const questionModel = require('../models/quizzes/question.model.service')
    app.post('/api/question', createQuestion);
    app.get('/api/question', findAllQuestions);
    app.get('/api/question/:qid', findQuestionById);


    createQuestion = (req,res) =>
        questionModel.createQuestion(req.body)
            .then(
                question => res.json(question),
                error => res.send(error)
            )

    findAllQuestions = (req, res) =>
        questionModel.findAllQuestions()
            .then(questions => res.send(questions))

    findQuestionById = (req, res) =>
        questionModel.findQuestionById(req.params['qid'])
            .then(question => res.send(question))
    
}