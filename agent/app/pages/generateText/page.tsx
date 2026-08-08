"use client";

import { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generateText", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemPrompt, temperature }),
      });

      const data = await response.json();
      setResult(data.text);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        Generate Text
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none resize-none transition-all text-gray-800 bg-white mb-0"
          rows={4}
        />
        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}
        >
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            placeholder="Enter system prompt..."
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none resize-none transition-all text-gray-800 bg-white"
            rows={4}
          />
          <label className="block text-gray-700 font-medium">
            Temperature: {temperature}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className="w-full"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mx-2 px-6 py-3 bg-gray-100 text-black rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-small"
        >
          {isExpanded ? "Hide settings" : "Show settings"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Generated Text:
          </h3>
          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {result}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
