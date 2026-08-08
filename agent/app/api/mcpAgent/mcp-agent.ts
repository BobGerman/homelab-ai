import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { createMCPClient } from '@ai-sdk/mcp';
import { ToolLoopAgent, InferAgentUIMessage, type Tool } from 'ai';

const modelProvider = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1',
  supportsStructuredOutputs: true
});

const model = modelProvider(process.env.LLM_MODEL_ID || "");
console.log(`Using LLM model: ${process.env.LLM_MODEL_ID}`);

const mcpClient = await createMCPClient({
  transport: {
    type: 'http',
    url: process.env.MCP_URL || 'http://localhost:3001/mcp'
  },
});

const mcpTools = await mcpClient.tools();

export const mcpAgent = new ToolLoopAgent({
  model,
  instructions: 'You are a helpful assistant.',
  tools: mcpTools as Record<string, Tool<any, any>>,
  onFinish: async (output) => {
    mcpClient.close();
  }
});

export type McpAgentUIMessage = InferAgentUIMessage<typeof mcpAgent>;