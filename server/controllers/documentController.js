const Document = require("../models/Document");
const Identity = require("../models/Identity");

const createTestDocument = async (req, res) => {
    try {
        // Find our test identity
        const identity = await Identity.findOne({
            identityId: "ID-10001"
        });

        if (!identity) {
            return res.status(404).json({
                success: false,
                message: "Test identity not found"
            });
        }

        // Create a test document linked to that identity
        const document = await Document.create({
            identity: identity._id,

            documentType: "aadhaar",

            fileName: "aadhaar_test.jpg",

            filePath: "uploads/ID-10001/aadhaar_test.jpg",

            ocrStatus: "pending",

            extractedData: {},

            tamperingStatus: "not_checked",

            verificationStatus: "pending"
        });

        res.status(201).json({
            success: true,
            message: "Test document created successfully",
            document
        });

    } catch (error) {
        console.error("Document creation error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to create test document",
            error: error.message
        });
    }
};

module.exports = {
    createTestDocument
};