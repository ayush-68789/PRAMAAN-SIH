const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        identity: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Identity",
            required: true
        },

        documentType: {
            type: String,
            enum: [
                "aadhaar",
                "pan",
                "birth_certificate",
                "school_certificate",
                "address_proof"
            ],
            required: true
        },

        fileName: {
            type: String,
            required: true,
            trim: true
        },

        filePath: {
            type: String,
            required: true,
            trim: true
        },

        ocrStatus: {
            type: String,
            enum: [
                "pending",
                "processing",
                "completed",
                "failed"
            ],
            default: "pending"
        },

        extractedData: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        },

        tamperingStatus: {
            type: String,
            enum: [
                "not_checked",
                "clean",
                "suspicious",
                "tampered"
            ],
            default: "not_checked"
        },

        verificationStatus: {
            type: String,
            enum: [
                "pending",
                "verified",
                "flagged",
                "rejected"
            ],
            default: "pending"
        }
    },
    {
        timestamps: true
    }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;