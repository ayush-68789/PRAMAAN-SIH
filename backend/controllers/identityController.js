const Identity = require("../models/Identity");

const createTestIdentity = async (req, res) => {
    try {
        const identity = await Identity.create({
            identityId: "ID-10001",
            name: "Rahul Sharma",
            dob: "2003-08-15",
            gender: "Male",
            parents: [
                "Amit Sharma",
                "Sunita Sharma"
            ],
            phone: "9999999999",
            email: "rahul.test@example.com",
            address: "Mathura, Uttar Pradesh",
            verificationStatus: "pending"
        });

        res.status(201).json({
            success: true,
            message: "Test identity created successfully",
            identity
        });

    } catch (error) {
        console.error("Identity creation error:", error.message);

        const payload = {
            success: false,
            message: "Failed to create identity"
        };

        if (process.env.NODE_ENV !== "production") {
            payload.error = error.message;
        }

        res.status(500).json(payload);
    }
};

module.exports = {
    createTestIdentity
};