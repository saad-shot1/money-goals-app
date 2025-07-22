const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve frontend files

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/ask", async (req, res) => {
  const userQuestion = req.body.question;
  console.log("📩 Question received:", userQuestion);

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userQuestion }],
      max_tokens: 200,
    });

    const aiResponse = chatCompletion.choices[0].message.content;
    console.log("✅ AI response:", aiResponse);
    res.json({ answer: aiResponse });
  } catch (error) {
    console.error("❌ Error from OpenAI:", error.message);
    res.status(500).json({ error: "Something went wrong with the AI service." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
