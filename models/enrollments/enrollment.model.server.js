var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
   enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function unenrollStudentInSection(enrollment) {
    return enrollmentModel.remove(enrollment);
}
function deleteEnrollment(sectionId) {
    return enrollmentModel.findOneAndRemove({section: sectionId}, function (err) {
        console.log(err);
    })
}
function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    unenrollStudentInSection: unenrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    deleteEnrollment: deleteEnrollment
};