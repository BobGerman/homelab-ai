import { mcpAgent } from './mcp-agent';
import { createAgentUIStreamResponse } from 'ai';

export async function POST(request: Request) {
  const { messages } = await request.json();

  // TODO: Remove this debug log in production
  console.log(`In /api/mcpAgent; received ${messages.length} messages`);

  return createAgentUIStreamResponse({
    agent: mcpAgent,
    uiMessages: messages,
  });
}