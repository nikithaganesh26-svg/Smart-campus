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

        // ID obtained from the QR code
        scanId: {
            type: String,
            required: true
        },

        destination: {
            type: String,
            default: ""
        },

        // Visitor check-in time
        checkInTime: {
            type: Date,
            required: true
        },

        // Visitor check-out time
        checkOutTime: {
            type: Date,
            default: null
        },

        // Duration in minutes
        duration: {
            type: Number,
            default: null
        },

        // Active or Completed
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