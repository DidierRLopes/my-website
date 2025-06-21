import React from 'react';

const terminalStyle: React.CSSProperties = {
  backgroundColor: '#0d0221',
  color: '#00f6ff',
  fontFamily: 'monospace',
  padding: '20px',
  height: '500px',
  width: '100%',
  overflowY: 'auto',
  border: '1px solid #00f6ff',
  borderRadius: '5px',
};

const inputLineStyle: React.CSSProperties = {
    display: 'flex',
};

const promptStyle: React.CSSProperties = {
    marginRight: '10px',
    color: '#f0f',
};

const inputStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  border: 'none',
  color: '#00f6ff',
  fontFamily: 'monospace',
  fontSize: '1em',
  width: '100%',
  outline: 'none',
};

export type Message = {
    text: string;
    sender: 'user' | 'ai' | 'error';
};

interface TerminalProps {
    history: Message[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

export const Terminal = ({ history, onSendMessage, isLoading }: TerminalProps) => {
  const [input, setInput] = React.useState('');
  const endOfMessagesRef = React.useRef(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        onSendMessage(input);
        setInput('');
      }
    }
  };

  React.useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getSenderStyle = (sender: Message['sender']) => {
    switch (sender) {
        case 'user':
            return { color: '#f0f', whiteSpace: 'pre-wrap' as const };
        case 'ai':
            return { color: '#00f6ff', whiteSpace: 'pre-wrap' as const };
        case 'error':
            return { color: '#ff0000', whiteSpace: 'pre-wrap' as const };
        default:
            return {};
    }
  }

  return (
    <div style={terminalStyle}>
      {history.map((line, index) => (
        <div key={`${line.sender}-${line.text}-${index}`} style={getSenderStyle(line.sender)}>
          {line.sender === 'user' ? `> ${line.text}` : line.text}
        </div>
      ))}
      <div style={inputLineStyle}>
        <span style={promptStyle}>&gt;</span>
        <input
          type="text"
          style={inputStyle}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={isLoading ? 'AI is thinking...' : 'Type your message...'}
          disabled={isLoading}
        />
      </div>
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default Terminal; 