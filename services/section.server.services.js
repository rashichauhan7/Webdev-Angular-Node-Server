module.exports = function(app) {
    const sectionModel = require('../models/sections/section.model.server');
    const enrollmentModel = require('../models/enrollments/enrollment.model.server');



    app.get('/api/student/:sid/section', (req, res) =>
            enrollmentModel
                .findSectionsForStudent(req.params['sid'])
                .then(function (enrollments) {
                    res.json(enrollments);
                })
    )

    app.post('/api/student/:sid/section/:sectionId/enroll', (req, res) => {
        var sectionId = req.params['sectionId'];
        var studentId = req.params['sid'];
        var enrollment = {
            student: studentId,
            section: sectionId
        };
        sectionModel
            .decrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            })
    }
   )

    app.get('/api/course/:courseId/section', (req, res) =>
        sectionModel
            .findAllSectionsForCourse(req.params['courseId'])
            .then(sections => res.send(sections))
    )

    app.post('/api/course/:courseId/section', (req, res) =>
        sectionModel
            .createSection(req.body)
            .then(section => res.send(section))
    )
};