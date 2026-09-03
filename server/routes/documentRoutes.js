const express = require("express");

const {
    createTestDocument
} = require("../controllers/documentController");

const router = express.Router();

router.post("/test", createTestDocument);

module.exports = router;