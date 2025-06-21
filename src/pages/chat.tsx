import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Terminal, { type Message } from '@site/src/components/Terminal';

const CenteredContainer: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem'
    }}>
        {children}
    </div>
);

const StatusCircle = ({ status }: { status: 'online' | 'offline' | 'pending' }) => {
    const color = status === 'online' ? '#28a745' : status === 'offline' ? '#dc3545' : '#6c757d';
    return (
        <span style={{
            height: '10px',
            width: '10px',
            backgroundColor: color,
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '8px',
            transition: 'background-color 0.5s ease',
        }} title={`Ollama status: ${status}`}></span>
    );
};

const ChatPage = () => {
  return (
    <Layout title="Chat">
        <BrowserOnly>{() => <ChatInterface />}</BrowserOnly>
    </Layout>
  );
};

const ChatInterface = () => {
    const [ollamaUrl, setOllamaUrl] = React.useState('http://localhost:11434');
    const [model, setModel] = React.useState('llama3.1:8b');
    const [availableModels, setAvailableModels] = React.useState<string[]>([]);
    const [embeddingModel, setEmbeddingModel] = React.useState<string>('');
    const [availableEmbeddingModels, setAvailableEmbeddingModels] = React.useState<string[]>([]);
    const [history, setHistory] = React.useState<Message[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [ollamaStatus, setOllamaStatus] = React.useState<'online' | 'offline' | 'pending'>('pending');

    useEffect(() => {
        const storedUrl = localStorage.getItem('ollamaUrl');
        if (storedUrl) {
            setOllamaUrl(storedUrl);
        }
    }, []);

    useEffect(() => {
        const checkOllamaStatusAndFetchModels = async () => {
            setOllamaStatus('pending');
            try {
                const response = await fetch(`${ollamaUrl}/api/tags`);
                if (!response.ok) throw new Error('Server not responding');
                const data = await response.json();
                const allModels = data.models.map((m: { name: string }) => m.name);
                
                const chatModels = allModels.filter((name: string) => !name.includes('embed'));
                setAvailableModels(chatModels);
                if (chatModels.length > 0 && !chatModels.includes(model)) {
                    setModel(chatModels[0]);
                }

                const embeddingModels = allModels.filter((name: string) => name.includes('embed'));
                setAvailableEmbeddingModels(embeddingModels);
                if (embeddingModels.length > 0) {
                    setEmbeddingModel(embeddingModels[0]);
                }
                setOllamaStatus('online');
            } catch (error) {
                console.error("Failed to fetch Ollama models:", error);
                setOllamaStatus('offline');
                setAvailableModels([]);
                setAvailableEmbeddingModels([]);
            }
        };

        checkOllamaStatusAndFetchModels();
    }, [ollamaUrl]);

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
                setHistory(prev => {
                    if (prev.length > 0 && prev[prev.length - 1].sender === 'ai') {
                        const lastMessage = prev[prev.length - 1];
                        return [...prev.slice(0, -1), { ...lastMessage, text: lastMessage.text + '\n\n' }];
                    }
                    return prev;
                });
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
          setHistory(prev => [...prev, { text: `Error: ${(error as Error).message}\n\n`, sender: 'error' }]);
        } finally {
            setIsLoading(false);
        }
      };

    return (
        <CenteredContainer>
            <h1 style={{ marginBottom: '2rem' }}>Chat</h1>
            <div style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                <p style={{ textAlign: 'center' }}>
                    This page allows you to chat with a local AI model running on your machine using Ollama.
                    Please ensure Ollama is running and you have a model (and embedings) available.
                </p>
            </div>

            <div style={{ marginBottom: '2rem', width: '60%'}}>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="ollama-url">
                        <StatusCircle status={ollamaStatus} />
                        Ollama URL: 
                    </label>
                    <input
                        id="ollama-url"
                        type="text"
                        value={ollamaUrl}
                        onChange={handleUrlChange}
                        style={{ width: '300px', marginLeft: '8px' }}
                        disabled={ollamaStatus === 'pending'}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="ollama-embedding-model">Embeddings: </label>
                    <select
                        id="ollama-embedding-model"
                        value={embeddingModel}
                        onChange={(e) => setEmbeddingModel(e.target.value)}
                        style={{ width: '300px', marginLeft: '8px' }}
                        disabled={ollamaStatus !== 'online' || availableEmbeddingModels.length === 0}
                    >
                        {availableEmbeddingModels.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="ollama-model">Model: </label>
                    <select
                        id="ollama-model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        style={{ width: '300px', marginLeft: '8px' }}
                        disabled={ollamaStatus !== 'online' || availableModels.length === 0}
                    >
                        {availableModels.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
            </div>

            <Terminal history={history} onSendMessage={handleSendMessage} isLoading={isLoading} />
        </CenteredContainer>
    )
}

export default ChatPage; 