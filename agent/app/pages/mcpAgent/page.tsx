'use client';

import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import ChatInput from '../../components/chat-input';
import type { McpAgentUIMessage } from '../../api/mcpAgent/mcp-agent';
import { DefaultChatTransport } from 'ai';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import '../../styles/chatUi.css';
import { de } from 'zod/locales';

export default function McpAgent() {
  const { status, sendMessage, messages, stop } =
    useChat<McpAgentUIMessage>
      (
        {
          transport: new DefaultChatTransport({
            api: '/api/mcpAgent',
          }),
        }
      );

  // Set up auto-scroll to bottom on new messages
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const chatMessages = chatMessagesRef.current;
    if (!chatMessages) return;

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, [messages]);

  return (
    <>
      <div className="chat-messages" id="chatMessages" ref={chatMessagesRef}>
        <div className="message bot">
          {messages?.map(message => (
            <div key={message.id} className="message-content">
              <strong>{`${message.role}: `}</strong>
              {message.parts.map((part, index) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <ReactMarkdown key={index} remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {part.text}
                      </ReactMarkdown>
                    );

                  case 'step-start':
                    return index > 0 ? (
                      <div key={index} className="text-gray-500">
                        <hr className="my-2 border-gray-300" />
                      </div>
                    ) : null;

                  default:
                    return <div key={index}>
                      `Called tool: {part.type}`
                    </div>;
                }
              })}
              <br />
            </div>
          ))}

        </div>
      </div>
      <div className="chat-input">
        <ChatInput status={status}
          onSubmit={text => sendMessage({ text })}
          stop={stop} />
      </div>
    </>
  );
}