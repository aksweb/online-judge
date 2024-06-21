const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adminRole: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', userSchema); 