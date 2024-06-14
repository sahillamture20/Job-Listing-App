const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const userRoute = require('./routes/userRoute');

const app = express(); // this objec will provide various features like .get(), .post(), etc
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.log(err))

app.use('/user', userRoute);

app.get("/health", (req, res) => {
    res.json({
        message: "Job listing API is working fine.",
        status: true,
        date: new Date().toLocaleDateString()
    });
});

app.listen( process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
/*
    // res.send(); => Allows string as o/p
    // res.json(); => allows JSON obj as response
    // res.sendFile() => send files, inages, etc.
    // res.redirect(); => redirect to another page
    // res.render(); => render a template
 */