const FAQ = require("../models/FAQ");

const uploadFAQs = async (req, res) => {
  try {
    const faqs = req.body.faqs; // [{question, answer}, ...]

    await FAQ.insertMany(faqs);

    res.json({ message: "FAQs uploaded successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to upload FAQs" });
  }
};

module.exports = { uploadFAQs };
