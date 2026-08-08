import { embed, cosineSimilarity } from "ai";
import embeddimgModel from "../../models/embedModel";

export interface ResultType {
  embedding: number[];
  similarEmbeddings: { name: string, similarity: number }[];
}

// In-memory store for known embeddings
let knownEmbeddings: { name: string, embedding: number[] }[] = [];

export async function POST(req: Request) {

  const { name, content } = await req.json();
  console.log(`Generating ${name} embedding for content: ${content}`);

  if (!name || !content) {
    knownEmbeddings = [];
    console.log("Cleared known embeddings store.");
    return Response.json({ embedding: [], similarEmbeddings: [] })
  }

  const { embedding } = await embed({
    model: embeddimgModel,
    value: content || "Hello, world!",
  });

  const similarEmbeddings: { name: string, similarity: number }[] =
    knownEmbeddings.map(({ name: knownName, embedding: knownEmbedding }) => {
      const similarity = cosineSimilarity(embedding, knownEmbedding);
      return { name: knownName, similarity };
    })
      .sort((a, b) => b.similarity - a.similarity); // Sort by similarity descending

  // Add the new embedding in the in-memory store
  knownEmbeddings.push({ name, embedding });
  console.log(`Stored embedding for ${name}. Total embeddings: ${knownEmbeddings.length}`);

  return Response.json({ similarEmbeddings, embedding } as ResultType);

} 
