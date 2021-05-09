const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
    firstName: {
        type: String,
        default: null,
        required: true
    },
    lastName: {
        type: String,
        default: null,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    bloodGroup: {
        type: String,
        default: null,
        required: true
    },
    Sex: {
        type: String,
        default: null,
        required: true
    },
    maritalStatus: {
        type: String,
        default: null,
        required: true
    },
    email: {
        type: String,
        default: null,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        default: null,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: null,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    doctorName: {
        type: String,
        default: null,
        required: true
    },
    doctorSpeciality: {
        type: String,
        default: null,
        required: true
    }
}, {
    timestamps: true,
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;