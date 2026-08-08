import { generateText } from "ai";
import model from "../../models/llmModel";

export async function POST(req: Request) {
  const { prompt, systemPrompt, temperature } = await req.json();

  const { text } = await generateText({
    model,
    prompt: prompt || "Greet the user",
    system: systemPrompt || "You are a friendly AI assistant",
    temperature: temperature ?? 0.7,
    maxOutputTokens: 200,
  });

  return Response.json({ text });

} 
