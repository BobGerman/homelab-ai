import { LanguageModel } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

function getLanguageModel(): LanguageModel {

    const modelProvider = createOpenAICompatible({
        name: 'lmstudio',
        baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1',
        supportsStructuredOutputs: true
    });

    const model = modelProvider(process.env.LLM_MODEL_ID || "");
    console.log(`Using LLM model: ${process.env.LLM_MODEL_ID}`);

    return model;
}

export default getLanguageModel();