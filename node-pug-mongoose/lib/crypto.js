let sha256 = require('sha256');

function encrypt(cleanPassword, salt) {
    let text  = [cleanPassword, salt].join('__');
    return sha256(text);
}

function compare(cleanPassword, salt, savedPassword) {
    let encrypted = encrypt(cleanPassword, salt);
    if(savedPassword === encrypted) {
        return true;
    }
    return false;
}

module.exports = {
    encrypt,
    compare
};