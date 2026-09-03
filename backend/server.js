require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const identityRoutes = require("./routes/identityRoutes");
const documentRoutes = require("./routes/documentRoutes");

const app = express();

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/identities", identityRoutes);
app.use("/api/documents", documentRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend server is running",
        port: PORT
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});