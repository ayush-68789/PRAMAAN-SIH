const express = require("express");

const {
    createTestIdentity
} = require("../controllers/identityController");

const router = express.Router();

router.post("/test", createTestIdentity);

module.exports = router;