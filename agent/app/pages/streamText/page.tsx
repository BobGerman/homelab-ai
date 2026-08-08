"use client";

import { useCompletion } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function Home() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/streamText",
    });

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        Stream Text
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your prompt..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none resize-none transition-all text-gray-800 bg-white"
          rows={4}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </form>

      {completion && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
              {completion}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
