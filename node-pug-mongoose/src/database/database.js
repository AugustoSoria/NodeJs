const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/loginedUsers'

mongoose.connect(url)
    .then(console.log('db connected'))
    .catch(err => console.log(err))