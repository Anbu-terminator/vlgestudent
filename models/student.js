const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    registrationNumber: { type: String, required: true, unique: true },
    certificationNumber: { type: String, required: true },
    studentName: { type: String, required: true },
    courseName: { type: String, required: true },
    passOrFail: { type: String },
    grade: { type: String },
    instituteName: { type: String },
    courseCompletedStatus: { type: String },
    internshipStatus: { type: String }
}, { collection: 'studentverification' }); // Specify the collection

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
