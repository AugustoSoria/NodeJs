const mongoose = require('mongoose');
const crypto = require('../../../lib/crypto');

const userSchema = new mongoose.Schema({
    id: String,
    user: String,
    email: String,
    salt: Number,
    password: String,
})

userSchema.methods.encryptPassword = function(password, salt) {
    return crypto.encrypt(password, salt)
}

userSchema.methods.comparePassword = function(password) {
    return crypto.compare(password, this.salt, this.password)
}

module.exports = mongoose.model('users', userSchema)