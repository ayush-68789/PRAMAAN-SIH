const mongoose = require("mongoose");

const identitySchema = new mongoose.Schema(
    {
        identityId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        dob: {
            type: Date
        },

        gender: {
            type: String,
            trim: true
        },

        parents: [
            {
                type: String,
                trim: true
            }
        ],

        phone: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            trim: true,
            lowercase: true
        },

        address: {
            type: String,
            trim: true
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

const Identity = mongoose.model("Identity", identitySchema);

module.exports = Identity;