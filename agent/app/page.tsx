"use client";

export default function Home() {

  return (

    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        Bob&apos;s Agent Playground
      </h1>

      <img src="/AgentPlayground.png" alt="Agent Playground"
        style={{ margin: "-20pt 0 10pt 0" }} />
      <p className="text-sm italic">
        This app uses Vercel AI Library and NextJS to showcase AI features used in agents
        with local AI models funning in LM Studio. LM Studio exposes an Open AI compatible
        API; the URL and model can be configured in `env.local`. Other providers can be configured
        by modifying /api/aimodel.ts.
      </p>
      <br /><hr /> <br />

      <p className="mb-4">
        The app is based on these tutorials:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">
          <a href="https://www.aihero.dev/vercel-ai-sdk-tutorial"
            className="text-blue-600 hover:underline"
            target="_blank">
            AI Hero: Vercel AI SDK Tutorial
          </a>
        </li>
        <li className="mb-2">
          <a href="https://www.codecademy.com/article/guide-to-vercels-ai-sdk"
            className="text-blue-600 hover:underline"
            target="_blank">
            Codecademy: What is Vercel AI SDK
          </a>
        </li>
      </ul>
    </div>
  );
}
