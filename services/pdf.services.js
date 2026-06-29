import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const generateLatexCode = async (formData) => {

    const { chapters, package:pkg , pages } = formData;

    const prompt = `Generate latex code of ${pages}pages using report class , generate ${chapters}`;

    // Use chat.completions.create instead of responses.create
    const response = await client.chat.completions.create({
        model: "openai/gpt-oss-120b", // Ensure you are using a model name supported by Groq
        messages: [{ role: "user", content: prompt }],
    });

    // Access the content correctly
    return response.choices[0].message.content;
};