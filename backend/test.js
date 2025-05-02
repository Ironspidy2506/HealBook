import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAKhaYnwtd8Ss6xNoQ6TzmLWvxZbOtnLC4" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "How does AI work?",
  });
  console.log(response.text);
}

await main();