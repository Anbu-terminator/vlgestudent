const express = require('express');
const Student = require('../models/student'); // Ensure the correct model is imported
const router = express.Router();
const pdf = require('html-pdf'); 

// Get student details by registration number
router.get('/:registrationNumber', async (req, res) => {
    try {
        const student = await Student.findOne({ registrationNumber: req.params.registrationNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/pdf/:registrationNumber', async (req, res) => {
    const student = await Student.findOne({ registrationNumber: req.params.registrationNumber });
    if (!student) {
        return res.status(404).json({ message: 'Student not found' });
    }

    const html = `
        <h1>Student Verification Details</h1>
        <p><strong>Name:</strong> ${student.studentName}</p>
        <p><strong>Registration Number:</strong> ${student.registrationNumber}</p>
        <p><strong>Institution Name:</strong> ${student.instituteName}</p>
        <p><strong>Internship Status:</strong> ${student.internshipStatus}</p>
        <p><strong>Certificate Number:</strong> ${student.certificationNumber}</p>
        <p><strong>Course Name:</strong> ${student.courseName}</p>
        <p><strong>Course Completed Status:</strong> ${student.courseCompletedStatus}</p>
        <p><strong>Pass or Fail:</strong> ${student.passOrFail}</p>
        <p><strong>Grade:</strong> ${student.grade}</p>
    `;

    pdf.create(html).toStream((err, stream) => {
        if (err) return res.status(500).send(err);
        res.setHeader('Content-type', 'application/pdf');
        stream.pipe(res);
    });
});

module.exports = router;
