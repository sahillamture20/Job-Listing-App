const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute');
const jobRoute = require('./routes/jobRoute');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});

app.use('/user', userRoute);
app.use('/job', jobRoute);

// http://localhost:3000/health
app.get('/health', (req, res) => {
    res.json({
        message: 'Job listing API is working fine',
        status: 'Working',
        date: new Date().toLocaleDateString()
    });
});

// REDIRECT PAGE TO 404
app.use("*", (req, res) => {
    res.status(404).json({
        message: 'Endpoint not found',
        status: 'Error',
    });
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Server is running on port ${process.env.PORT}`);
});