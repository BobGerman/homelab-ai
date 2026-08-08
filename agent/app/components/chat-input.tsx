import { useState } from 'react';

export default function ChatInput({
  status,
  onSubmit,
  stop,
}: {
  status: string;
  onSubmit: (text: string) => void;
  stop?: () => void;
}) {
  const [text, setText] = useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (text.trim() === '') return;
        onSubmit(text);
        setText('');
      }}
    >
      <input
        placeholder="Say something..."
        disabled={status !== 'ready'}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      {(status === 'ready') && (
        <>
          <button
            type="submit"
            className="chat-input-send-button"
          >
            Send
          </button>
          &nbsp;
          <button
            className="chat-input-reset-button"
            onClick={() => window.location.reload()}
            type="button">
            Reset
          </button>
        </>
      )}
      {stop && (status === 'streaming' || status === 'submitted') && (
        <button
          type="submit"
          onClick={stop}
          className="chat-input-stop-button"
        >
          Stop
        </button>
      )}
    </form>
  );
}