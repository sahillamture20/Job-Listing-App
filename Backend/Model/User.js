const mongoose = require('mongoose');

//name, email, password = each user have this
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, //use regex to parse or validate mail
        required: true,
        unique: true, //allow not to have 2 users same email
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);