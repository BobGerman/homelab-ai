import { generateText, Output } from "ai";
import model from "../../models/llmModel";

const SENTIMENT_OPTIONS = ["Positive", "Mixed", "Negative", "Neutral"];

export async function POST(req: Request) {
  const { prompt, systemPrompt, temperature } = await req.json();

  const { text } = await generateText({
    model,
    prompt: prompt || "I am unsure",
    system: systemPrompt ||
      `Analyze the sentiment of the given text and respond with ${SENTIMENT_OPTIONS.join(", ")}.`,
    output: Output.choice({ options: SENTIMENT_OPTIONS }),
    temperature: temperature ?? 0.7,
    maxOutputTokens: 200,
  });

  return Response.json({ text });

} 
