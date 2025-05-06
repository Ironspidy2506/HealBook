import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY, // Replace with env var in production
});

export const getAiInsights = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    res.json({ success: true, insights: response.text });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Failed to get insights" });
  }
};
