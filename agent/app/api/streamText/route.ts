import { streamText } from "ai";
import model from "../../models/llmModel";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model,
    prompt,
    maxOutputTokens: 2000,
  });

  return result.toUIMessageStreamResponse();

} 
