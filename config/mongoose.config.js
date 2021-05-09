const mongoose = require('mongoose');
require('dotenv').config();

const connect = async function () {
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
}

module.exports = {
    connect,
    mongoose
}