import model from "../../models/llmModel";
import { convertToModelMessages, streamText, UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model,
    system: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
  });

  console.log(`Sent ${messages.length} messages to model`);

  return result.toUIMessageStreamResponse();
}
