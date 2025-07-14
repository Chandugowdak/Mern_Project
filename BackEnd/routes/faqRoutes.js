const express = require("express");
const router = express.Router();
const { uploadFAQs } = require("../controllers/faqController");

router.post("/upload", uploadFAQs);

module.exports = router;
