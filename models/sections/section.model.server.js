const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);
const userModel = require('../user/user.model.server');

findAllSections = () =>
    sectionModel.find();

findAllSectionsForCourse = courseId =>
    sectionModel.find({courseId: courseId});

createSection = section =>
    sectionModel.create(section);

deleteSection = sectionId =>
    sectionModel.findOneAndRemove({_id: sectionId}, function(err)
    {
        console.log(err)
    });

updateSection = section =>
    sectionModel.update({_id: section._id}, {
        $set: section}
        )

decrementSectionSeats = (sectionId)  =>

    sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });


incrementSectionSeats = (sectionId) =>
    sectionModel.update({
      _id: sectionId
    }, {
        $inc: {seats: +1}
    });

module.exports = {
    findAllSections,
    findAllSectionsForCourse,
    createSection,
    decrementSectionSeats,
    incrementSectionSeats,
    deleteSection,
    updateSection
};