import { EmbeddingModel } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

function getEmbeddingModel(): EmbeddingModel {

    const modelProvider = createOpenAICompatible({
        name: 'lmstudio',
        baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1',
        supportsStructuredOutputs: true
    });

    const embeddingModel = modelProvider.embeddingModel(process.env.EMBEDDING_MODEL_ID || "")
    console.log(`Using embedding model: ${process.env.EMBEDDING_MODEL_ID}`);

    return embeddingModel;
}

export default getEmbeddingModel();