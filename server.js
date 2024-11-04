const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Web Design'))); // Serve static files from "Web Design"

// MongoDB connection (ensure database name is 'test')
mongoose.connect('mongodb+srv://anbulegend101:vlgeadmindata@vlge.8mhrh.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/student', studentRoutes); // API route for student verification

// Route to serve the student verification page as the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'studentverification.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
