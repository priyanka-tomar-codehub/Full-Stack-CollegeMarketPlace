import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateProductDescription = async ( title, description) => {

  const prompt = `You are an AI assistant for a college marketplace.

Generate a professional product description.

Product Name: ${title}

Current Description: ${description}

Keep it under 100 words.
`;

const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
  });

  return response.text;
};