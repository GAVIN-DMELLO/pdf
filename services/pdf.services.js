import "dotenv/config";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const generateLatexCode = async (formData) => {

    const { chapters, package:pkg , pages } = formData;

    const prompt = `Generate a latex code , write article class , then import lipsum, begin document,

    Generate a tikzpicture with [remember picture,overlay]. Use \fill (not \draw). Draw a filled rectangle from ([xshift=3cm,yshift=-2cm]current page.north west) using rectangle ++(16cm,-0.4cm). Do not use coordinate addition (+(...)).

    Add \vspace{-1cm}, then a single center environment containing a bold \LARGE heading, \\[0.5cm], and a \large subheading, followed by vspace{1cm}

     then write the lipsum dummy text for one page , then new page, then write lipsum dummy , then end the document . do as much as i said exactly not more not less not even a single word other than latex should be there`;

    // Use chat.completions.create instead of responses.create
    const response = await client.chat.completions.create({
        model: "openai/gpt-oss-120b", // Ensure you are using a model name supported by Groq
        messages: [{ role: "user", content: prompt }],
    });

    // Access the content correctly
    return response.choices[0].message.content;
};