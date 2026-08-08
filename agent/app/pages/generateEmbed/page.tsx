"use client";

import { useState } from "react";
import { ResultType } from "../../api/generateEmbed/route";
import { set } from "zod";

export default function Home() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [result, setResult] = useState({
    embedding: [],
    similarEmbeddings: [],
  } as ResultType | null);
  const [previousName, setPreviousName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generateEmbed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });

      const data: ResultType = await response.json();
      setResult(data);
      setPreviousName(name);
      setName("");
      setContent("");

    } catch (error) {

      console.error("Error:", error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        Embedding Demo
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name for this embedding"
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none resize-none transition-all text-gray-800 bg-white mb-4"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content"
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none resize-none transition-all text-gray-800 bg-white mb-0"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Similar to {previousName}:
          </h3>
          <ul className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words mb-6">
            {displaySimilarEmbeddings(result)}
          </ul>
          <hr />
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Full embedding for {previousName}:
          </h3>
          <ol className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
            {displayEmbedding(result)}
          </ol>
        </div>
      )}
    </div>
  );
}

function displaySimilarEmbeddings(result: ResultType) {

  return result.similarEmbeddings.map(({ name, similarity }, index) => (
    <li key={index} className="text-gray-600 ml-5 list-disc">
      {name} ({similarity.toFixed(4)})
      {index === 0 && ' ◄◄ Most similar'}
      {index === result.similarEmbeddings.length - 1 && ' ◄◄ Least similar'}
      <br />
    </li>
  ));
}

function displayEmbedding(result: ResultType) {

  return result.embedding.map((value, index) => (
    <li key={index} className="text-gray-600 ml-5">
      {String(index).padStart(4, ' ')}. {value}
    </li>
  ));
}
