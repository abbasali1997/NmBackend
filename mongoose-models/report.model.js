const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        immutable: true, 
    },
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
    sex: {
        type: String,
        default: null,
        required: true
    },
    maritalStatus: {
        type: String,
        default: null,
        required: true
    },
    bloodGroup: {
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
    email: {
        type: String,
        default: null,
        required: true
    },
    phoneNumber: {
        type: String,
        default: null,
        required: true
    },
    address: {
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
    },
    pneumothorax: {
        type: Boolean,
        default: false,
        required: true,
        immutable: true,
    },
    diagnosis: {
        type: String,
        default: 'none',
        required: true,
        immutable: true,
    }
}, {
    timestamps: true,
});

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;