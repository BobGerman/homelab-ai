import { generateText, Output } from 'ai';
import model from '../../models/llmModel';
// import { generateObject } from 'ai';
import { schema } from './RecipeSchema';

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const DEFAULT_SYSTEM_PROMPT = `You are a world-renouned chef and mixologist.
                                 You create easy recipes with simple ingredients.`
  const DEFAULT_USER_PROMPT = 'Old Fashioned cocktail';
  const DEFAULT_TEMPERATURE = 0.5;

  const { output } = await generateText({
    model,
    prompt: prompt || DEFAULT_USER_PROMPT,
    system: DEFAULT_SYSTEM_PROMPT,
    temperature: DEFAULT_TEMPERATURE,
    output: Output.object({
      schema
    })
  });

  return Response.json({ output });
} 
