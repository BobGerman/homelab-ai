import { weatherTool } from './weather-tool';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import { ToolLoopAgent, InferAgentUIMessage } from 'ai';

const modelProvider = createOpenAICompatible({
  name: 'lmstudio',
  baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1',
  supportsStructuredOutputs: true
});

// TODO: Remove this debug log in production
console.log('Initializing weather agent...');

const model = modelProvider(process.env.LLM_MODEL_ID || "");
console.log(`Using LLM model: ${process.env.LLM_MODEL_ID}`);

const instructions = `
 You are a helpful assistant and expert metiorologist.
 Use the provided weather tool to answer user queries about the weather.
 If the user asks about more than one location, be sure to use the weather tool for
 each location separately.  If the user asks you to compare the weather
 between multiple locations, present the comparison in a table.
 Always provide the most accurate and up-to-date information available.
`;

export const weatherAgent = new ToolLoopAgent({
  model,
  instructions,
  tools: {
    weather: weatherTool,
  },
});

export type WeatherAgentUIMessage = InferAgentUIMessage<typeof weatherAgent>;