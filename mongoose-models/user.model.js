const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null,
        unique: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: null
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
