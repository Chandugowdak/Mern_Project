const axios = require("axios");
const Chat = require("../models/Chat");
const FAQ = require("../models/FAQ");

const askAI = async (req, res) => {
  const { message } = req.body;

  try {
    const faqs = await FAQ.find({});
    const context =
      faqs.length > 0
        ? faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n")
        : "You are a helpful assistant that answers support questions.";

    const prompt = `${context}\n\nUser: ${message}\nAI:`;

    // ✅ PASS the key in the URL (NOT as Bearer)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          // ❌ DO NOT pass Authorization header for Gemini API key
          // Authorization: `Bearer ${process.env.GEMINI_API_KEY}` ❌❌❌
        },
      }
    );

    const aiReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "❌ Gemini did not return a proper reply.";

    await new Chat({ userMessage: message, aiResponse: aiReply }).save();

    res.json({ reply: aiReply });
  } catch (err) {
    console.error("❌ Gemini API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Gemini API call failed." });
  }
};

module.exports = { askAI };
