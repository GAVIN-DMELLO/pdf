import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const generateLatexCode = async (formData) => {

    const { chapters, package:pkg } = formData;

    const prompt = `Generate a LaTeX document using the report class. 
    Use the lipsum package. Start the document and create ${chapters} chapters. 
    Inside each chapter, include lipsum dummy text. 
    End the document. 
    Respond ONLY with raw LaTeX code. No markdown, no explanations do only as much as i said dont even try to add anything extra.`;

    // Use chat.completions.create instead of responses.create
    const response = await client.chat.completions.create({
        model: "openai/gpt-oss-120b", // Ensure you are using a model name supported by Groq
        messages: [{ role: "user", content: prompt }],
    });

    // Access the content correctly
    return response.choices[0].message.content;
};