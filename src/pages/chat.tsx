import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Terminal, { type Message } from '@site/src/components/Terminal';

const ChatPage = () => {
  return (
    <Layout title="Chat">
      <div style={{ padding: '2rem' }}>
        <h1>Chat with a local AI</h1>
        <p>
          This page allows you to chat with a local AI model running on your machine using Ollama.
          Please ensure Ollama is running and you have a model available.
          You can run a model like llama3 with the command: <code>ollama run llama3</code>.
        </p>
        <BrowserOnly>{() => <ChatInterface />}</BrowserOnly>
      </div>
    </Layout>
  );
};

const ChatInterface = () => {
    const [ollamaUrl, setOllamaUrl] = React.useState('http://localhost:11434');
    const [model, setModel] = React.useState('llama3.1:8b');
    const [history, setHistory] = React.useState<Message[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        const storedUrl = localStorage.getItem('ollamaUrl');
        if (storedUrl) {
            setOllamaUrl(storedUrl);
        }
    }, []);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setOllamaUrl(newUrl);
        localStorage.setItem('ollamaUrl', newUrl);
    };

    const handleSendMessage = async (message: string) => {
        setIsLoading(true);
        const newHistory = [...history, { text: message, sender: 'user' as const }];
        setHistory(newHistory);
    
        try {
          const chatResponse = await fetch(`${ollamaUrl}/api/chat`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model,
              messages: [{ role: 'user', content: message }],
              stream: true,
            }),
          });

          // Fallback to /api/generate if /api/chat is not found (older Ollama)
          const response = chatResponse.status === 404 ? await fetch(`${ollamaUrl}/api/generate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model,
              prompt: message,
              stream: true,
            }),
          }) : chatResponse;

          if (!response.body) {
            throw new Error('No response body');
          }

          setHistory(prev => [...prev, { text: '', sender: 'ai' }]);
    
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
    
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                let parsed: any;
                try {
                  parsed = JSON.parse(line);
                } catch {
                  parsed = { message: { content: line }, response: line };
                }

                const content = parsed?.message?.content ?? parsed?.response ?? '';
                if (content) {
                    setHistory(prev => {
                        const lastMessage = prev[prev.length - 1];
                        const updatedLastMessage = { ...lastMessage, text: lastMessage.text + content };
                        return [...prev.slice(0, -1), updatedLastMessage];
                    });
                }
            }
          }
        } catch (error) {
          console.error(error);
          setHistory(prev => [...prev, { text: `Error: ${error.message}`, sender: 'error' }]);
        } finally {
            setIsLoading(false);
        }
      };

    return (
        <div>
            <div>
                <label htmlFor="ollama-url">Ollama URL: </label>
                <input
                    id="ollama-url"
                    type="text"
                    value={ollamaUrl}
                    onChange={handleUrlChange}
                    style={{ width: '300px', marginBottom: '1rem' }}
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="ollama-model">Model: </label>
                <input
                    id="ollama-model"
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    style={{ width: '200px' }}
                />
            </div>
            <Terminal history={history} onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
    )
}

export default ChatPage; 