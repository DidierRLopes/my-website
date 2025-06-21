import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

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
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const terminalStyle: React.CSSProperties = {
        backgroundImage: isDark ? 'url(/img/terminal_bg_dark.png)' : 'url(/img/terminal_bg_light.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        color: isDark ? 'white' : 'black',
        fontFamily: 'monospace',
        padding: '20px',
        height: '500px',
        width: '60%',
        margin: '0 auto',
        overflowY: 'auto',
        borderRadius: '5px',
        boxShadow: `0 0 12px 4px ${isDark ? 'rgba(255, 255, 0, 0.5)' : 'rgba(0, 0, 255, 0.3)'}`,
        transition: 'box-shadow 0.3s ease-in-out',
    };

    const inputLineStyle: React.CSSProperties = {
        display: 'flex',
    };

    const promptStyle: React.CSSProperties = {
        marginRight: '10px',
        color: isDark ? 'white' : 'black',
    };

    const inputStyle: React.CSSProperties = {
        backgroundColor: 'transparent',
        border: 'none',
        color: isDark ? 'white' : 'black',
        fontFamily: 'monospace',
        fontSize: '1em',
        width: '100%',
        outline: 'none',
    };

  const [input, setInput] = React.useState('');
  const endOfMessagesRef = React.useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSendMessage(input);
        setInput('');
      }
    }
  };

  React.useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getSenderStyle = (sender: Message['sender']) => {
    const baseStyle = {
        whiteSpace: 'pre-wrap' as const,
        maxWidth: '70%',
        wordWrap: 'break-word' as const,
    };

    switch (sender) {
        case 'user':
            return { ...baseStyle, color: isDark ? 'white' : 'black' };
        case 'ai':
            return { ...baseStyle, color: isDark ? 'yellow' : 'blue' };
        case 'error':
            return { ...baseStyle, color: '#ff0000' };
        default:
            return { ...baseStyle, color: isDark ? 'white' : 'black' };
    }
  }

  const placeholderColor = isDark ? 'rgba(255, 255, 255, 0.5)' : '#6c757d';

  return (
    <>
      <style>
        {`
          #terminal-input::placeholder {
            color: ${placeholderColor};
            opacity: 1; /* Firefox */
          }
        `}
      </style>
      <div style={terminalStyle}>
        {history.map((line, index) => (
          <div key={`${line.sender}-${line.text}-${index}`} style={getSenderStyle(line.sender)}>
            {line.sender === 'user' ? `> ${line.text}` : line.text}
          </div>
        ))}
        {!isLoading && (
          <div style={inputLineStyle}>
            <span style={promptStyle}>&gt;</span>
            <input
              id="terminal-input"
              type="text"
              style={inputStyle}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
            />
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </>
  );
};

export default Terminal; 