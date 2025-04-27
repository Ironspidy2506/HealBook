import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAiInsights = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res
      .status(400)
      .json({ success: false, message: "No prompt provided" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      success: true,
      insights: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({ success: false, message: "AI request failed" });
  }
};
