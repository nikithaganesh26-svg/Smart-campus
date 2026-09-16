const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        visitorType: {
            type: String,
            required: true
        },

        scanId: {
            type: String,
            required: true
        },

        destination: {
            type: String,
            default: ""
        },

        checkInTime: {
            type: Date,
            required: true
        },

        checkOutTime: {
            type: Date,
            default: null
        },

        duration: {
            type: Number,
            default: null
        },

        status: {
            type: String,
            enum: ["Active", "Completed"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Visitor", visitorSchema);