import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Terminal, { type Message } from '../components/Terminal';
import { useColorMode } from '@docusaurus/theme-common';

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

const getWeatherIcon = (forecast: string): string => {
    const lowerCaseForecast = forecast.toLowerCase();
    if (lowerCaseForecast.includes('thunderstorm')) return '⛈️';
    if (lowerCaseForecast.includes('rain') || lowerCaseForecast.includes('shower')) return '🌧️';
    if (lowerCaseForecast.includes('snow')) return '❄️';
    if (lowerCaseForecast.includes('cloudy')) return '☁️';
    if (lowerCaseForecast.includes('partly cloudy') || lowerCaseForecast.includes('mostly cloudy')) return '⛅️';
    if (lowerCaseForecast.includes('sunny') || lowerCaseForecast.includes('clear')) return '☀️';
    if (lowerCaseForecast.includes('haze') || lowerCaseForecast.includes('fog')) return '🌫️';
    return '🌎'; // Default icon
};

const Clock = ({ color }: { color: string }) => {
    const [dateTime, setDateTime] = React.useState('');
    const [icon, setIcon] = React.useState('🌎');

    React.useEffect(() => {
        const fetchWeather = async () => {
            try {
                const pointsResponse = await fetch('https://api.weather.gov/points/40.71,-74.01');
                if (!pointsResponse.ok) throw new Error('Failed to fetch weather points');
                const pointsData = await pointsResponse.json();
                const forecastUrl = pointsData.properties.forecastHourly;

                const forecastResponse = await fetch(forecastUrl);
                if (!forecastResponse.ok) throw new Error('Failed to fetch hourly forecast');
                const forecastData = await forecastResponse.json();
                
                const currentPeriod = forecastData.properties.periods[0];
                if (!currentPeriod.isDaytime) {
                    setIcon('🌙');
                } else {
                    setIcon(getWeatherIcon(currentPeriod.shortForecast));
                }
            } catch (error) {
                console.error("Failed to fetch NYC weather:", error);
            }
        };

        fetchWeather();
        const weatherInterval = setInterval(fetchWeather, 900000); // every 15 minutes
        return () => clearInterval(weatherInterval);
    }, []);

    React.useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = { timeZone: 'America/New_York' };
            
            const year = new Intl.DateTimeFormat('en', { year: 'numeric', ...options }).format(now);
            const month = new Intl.DateTimeFormat('en', { month: '2-digit', ...options }).format(now);
            const day = new Intl.DateTimeFormat('en', { day: '2-digit', ...options }).format(now);

            const timeFormatter = new Intl.DateTimeFormat('en', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, ...options
            });
            const timeString = timeFormatter.format(now);
            const ms = now.getMilliseconds().toString().padStart(3, '0');

            setDateTime(`${day}/${month}/${year} ${timeString}:${ms}`);
        }, 50); // Update frequently for ms effect
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ position: 'absolute', top: '-25px', right: '0px', fontSize: '0.9em', color }}>
            NYC {icon}, {dateTime}
        </div>
    );
};

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
        }} title={`Ollama status: ${status}`}>
        </span>
    );
};

const IndexingProgress = ({ title, progress, isDark }) => {
    const textColor = isDark ? 'white' : 'black';
    const subtleGrey = isDark ? '#4A4A4A' : '#E0E0E0';
    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '28px',
            border: `1px solid ${isDark ? '#555' : '#CCC'}`,
            borderRadius: '5px',
            backgroundColor: 'transparent',
            marginTop: '1rem',
            overflow: 'hidden',
        }}>
            <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: subtleGrey,
                transition: 'width 0.15s ease-in-out',
            }} />
            <span style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                color: textColor,
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                maxWidth: 'calc(100% - 20px)'
            }}>
                {title ? `Indexing: ${title}` : 'Starting...'}
            </span>
        </div>
    );
};

const StyledButton = ({ onClick, disabled, children }) => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const [isHovered, setIsHovered] = React.useState(false);

    const style = {
        padding: '2px 12px',
        backgroundColor: disabled ? (isDark ? '#333' : '#EAEAEA') : (isDark ? (isHovered ? '#555' : '#444') : (isHovered ? '#DCDCDC' : '#EAEAEA')),
        color: disabled ? (isDark ? '#777' : '#AAA') : (isDark ? '#EEE' : '#333'),
        border: `1px solid ${disabled ? (isDark ? '#444' : '#DDD') : (isDark ? '#666' : '#CCC')}`,
        borderRadius: '5px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
    };

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            style={style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </button>
    );
};

type BlogVector = {
    title: string;
    content: string;
    embedding: number[];
    url: string;
    thumbnail: string;
};

function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
    if (magA === 0 || magB === 0) return 0;
    return dotProduct / (magA * magB);
}

function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

const GENERAL_SYSTEM_PROMPT = 'You are an AI assistant representing Didier Lopes. Founder, builder, and product thinker at the intersection of open source, AI and finance. Communicate with clarity, edge, and purpose. Prioritize actionable insight, strong opinions, and clean design. Avoid fluff. Speak to devs, investors, and power users. Think like a strategist, write like a builder, execute like a founder. Write in lower case only. Your task is to answer questions as if you were him, based *exclusively* on the content of his blog posts provided as context. If the provided context does not contain the answer to a question, you must state that you haven\'t written about that topic yet, rather than attempting to answer from your general knowledge.';

const RAG_SYSTEM_PROMPT = 'When you answer a question that has used context from one of the indexed blog posts, you should add a [source](blog_url) link at the end of your answer.';

const ChatPage = () => {
  return (
    <Layout title="Chat">
        <BrowserOnly>{() => <ChatInterface />}</BrowserOnly>
    </Layout>
  );
};

const ChatInterface = () => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const aiTextColor = isDark ? '#FFFF00' : 'blue';

    const [ollamaUrl, setOllamaUrl] = React.useState('http://localhost:11434');
    const [model, setModel] = React.useState('llama3.1:8b');
    const [availableModels, setAvailableModels] = React.useState<string[]>([]);
    const [embeddingModel, setEmbeddingModel] = React.useState<string>('');
    const [availableEmbeddingModels, setAvailableEmbeddingModels] = React.useState<string[]>([]);
    const [history, setHistory] = React.useState<Message[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [ollamaStatus, setOllamaStatus] = React.useState<'online' | 'offline' | 'pending'>('pending');
    
    const [indexing, setIndexing] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [currentlyIndexing, setCurrentlyIndexing] = React.useState('');
    const [vectorStore, setVectorStore] = React.useState<BlogVector[]>([]);
    const [indexingResult, setIndexingResult] = React.useState<{ count: number; timestamp: Date | null } | null>(null);

    useEffect(() => {
        const storedUrl = localStorage.getItem('ollamaUrl');
        if (storedUrl) {
            setOllamaUrl(storedUrl);
        }

        const cachedStore = localStorage.getItem('blogVectorStore');
        const checkAndSetVectorStore = () => {
            if (cachedStore) {
                const { model, vectors, timestamp } = JSON.parse(cachedStore);
                if (model === embeddingModel) {
                    setVectorStore(vectors);
                    setIndexingResult({ count: vectors.length, timestamp: new Date(timestamp) });
                }
            }
        };

        if (embeddingModel) {
            checkAndSetVectorStore();
        }
    }, [embeddingModel]);

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
                if (chatModels.length > 0 && !model) {
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
    }, [ollamaUrl, model]);

    const handleIndexBlog = async () => {
        if (!embeddingModel) {
            alert('Please select an embedding model first.');
            return;
        }
        setIndexing(true);
        setProgress(0);
        setCurrentlyIndexing('');
        setVectorStore([]);
        setIndexingResult(null);

        try {
            const feedResponse = await fetch('https://didierlopes.com/blog/feed.json');
            if (!feedResponse.ok) throw new Error('Failed to fetch blog feed');
            const feedData = await feedResponse.json();
            const posts = feedData.items;
            const newVectorStore: BlogVector[] = [];
    
            for (let i = 0; i < posts.length; i++) {
                const post = posts[i];
                setCurrentlyIndexing(post.title);
    
                try {
                    const content = stripHtml(post.content_html);
                    const imageMatch = post.content_html.match(/<img.*?src=\"(.*?)\"/);
                    const thumbnailUrl = imageMatch ? imageMatch[1] : '';
                    
                    const embeddingResponse = await fetch(`${ollamaUrl}/api/embeddings`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ model: embeddingModel, prompt: content }),
                    });
    
                    if (!embeddingResponse.ok) throw new Error(`Embedding failed for "${post.title}"`);
                    
                    const { embedding } = await embeddingResponse.json();
                    newVectorStore.push({ 
                        title: post.title, 
                        content: content, 
                        embedding, 
                        url: post.url,
                        thumbnail: thumbnailUrl
                    });
    
                } catch (error) {
                    console.error(`Error processing post "${post.title}":`, error);
                    setHistory(prev => [...prev, { text: `Error on "${post.title}": ${(error as Error).message}\n\n`, sender: 'error' }]);
                }
                setProgress(((i + 1) / posts.length) * 100);
            }
            
            setVectorStore(newVectorStore);
            const result = { count: newVectorStore.length, timestamp: new Date() };
            setIndexingResult(result);
            localStorage.setItem('blogVectorStore', JSON.stringify({ model: embeddingModel, vectors: newVectorStore, timestamp: result.timestamp }));
        } catch(e) {
            console.error(e);
            setHistory(prev => [...prev, { text: `Failed to index blog: ${(e as Error).message}\n\n`, sender: 'error' }]);
        } finally {
            setIndexing(false);
            setCurrentlyIndexing('');
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setOllamaUrl(newUrl);
        localStorage.setItem('ollamaUrl', newUrl);
    };

    const handleSendMessage = async (message: string) => {
        setIsLoading(true);
        const newHistory = [...history, { text: message, sender: 'user' as const }];
        setHistory(newHistory);
    
        let finalPrompt = message;
        let systemPrompt = GENERAL_SYSTEM_PROMPT;
        let bestMatch: BlogVector & { score: number } | null = null;

        if (vectorStore.length > 0 && embeddingModel) {
            try {
                // 1. Embed the user's query
                const queryEmbeddingResponse = await fetch(`${ollamaUrl}/api/embeddings`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ model: embeddingModel, prompt: message }),
                });
                if (!queryEmbeddingResponse.ok) throw new Error('Failed to embed user query.');
                const { embedding: queryEmbedding } = await queryEmbeddingResponse.json();

                // 2. Find the most similar chunk from the vector store
                let currentBestMatch: BlogVector & { score: number } | null = null;
                for (const item of vectorStore) {
                    const score = cosineSimilarity(queryEmbedding, item.embedding);
                    if (!currentBestMatch || score > currentBestMatch.score) {
                        currentBestMatch = { ...item, score: score };
                    }
                }
                bestMatch = currentBestMatch;
                console.log('Best match found:', bestMatch);

                // 3. Augment the prompt with the context
                if (bestMatch && bestMatch.score > 0.6 && bestMatch.url) { // Similarity threshold
                    finalPrompt = `Based on the following context, please answer the user's question.\n\nContext:\n---\n${bestMatch.content}\n---\n\nQuestion:\n${message}`;
                    systemPrompt = `${GENERAL_SYSTEM_PROMPT} ${RAG_SYSTEM_PROMPT.replace('blog_url', bestMatch.url)}`;
                }

            } catch(e) {
                console.error("Error during RAG:", e);
                setHistory(prev => [...prev, { text: `Could not retrieve context: ${(e as Error).message}`, sender: 'error' }]);
                // Continue without RAG context
            }
        }

        const conversationHistory = history
            .filter(h => (h.sender === 'user' || h.sender === 'ai'))
            .map(h => ({
                role: h.sender === 'ai' ? 'assistant' : 'user' as const,
                content: h.text.trim(),
            }));

        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory,
            { role: 'user', content: finalPrompt }
        ];

        try {
          const chatResponse = await fetch(`${ollamaUrl}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model,
              messages: messages, // Pass the full message history
              stream: true,
            }),
          });

          const response = chatResponse.status === 404 ? await fetch(`${ollamaUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model,
              system: systemPrompt, // Fallback still uses the system param
              prompt: finalPrompt,
              stream: true,
            }),
          }) : chatResponse;

          if (!response.body) {
            throw new Error('No response body');
          }

          setHistory(prev => [...prev, { text: '', sender: 'ai' }]);

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          let sourceForMessage: Message['source'] | undefined = undefined;

          while (true) {
            const { done, value } = await reader.read();
            if (done) {
                setHistory(prev => {
                    if (prev.length > 0 && prev[prev.length - 1].sender === 'ai') {
                        const lastMessage = prev[prev.length - 1];
                        
                        const aiResponseText = lastMessage.text.toLowerCase();
                        const confidenceToAnswer = !aiResponseText.includes("haven't written about that topic yet");

                        if (bestMatch && bestMatch.score > 0.6 && bestMatch.url && bestMatch.title && bestMatch.thumbnail && confidenceToAnswer) {
                            sourceForMessage = {
                                url: bestMatch.url,
                                title: bestMatch.title,
                                thumbnail: bestMatch.thumbnail,
                            };
                        }
                        console.log('Final source for message:', sourceForMessage);
                        let finalText = lastMessage.text.replace(/\[source\]\([^\)]+\)/gi, '').trim();
                        if (finalText.endsWith('\n')) {
                            finalText = finalText.replace(/\n+$/, '');
                        }
                        const finalMessage = { 
                            ...lastMessage, 
                            text: `${finalText}\n\n`,
                            source: sourceForMessage,
                        };
                        return [...prev.slice(0, -1), finalMessage];
                    }
                    return prev;
                });
                break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                let parsed: { message?: { content: string }; response?: string };
                try {
                  parsed = JSON.parse(line);
                } catch {
                  parsed = { response: line };
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div>
                        <label htmlFor="ollama-url">
                            <StatusCircle status={ollamaStatus} />
                            Ollama URL: 
                        </label>
                        <input
                            id="ollama-url"
                            type="text"
                            value={ollamaUrl}
                            onChange={handleUrlChange}
                            style={{ width: '250px', marginLeft: '8px' }}
                            disabled={ollamaStatus === 'pending'}
                        />
                    </div>
                    <div>
                        <label htmlFor="ollama-model">Model: </label>
                        <select
                            id="ollama-model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            style={{ width: '250px', marginLeft: '8px' }}
                            disabled={ollamaStatus !== 'online' || availableModels.length === 0 || indexing}
                        >
                            {availableModels.map((m) => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div style={{marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="ollama-embedding-model" style={{ minWidth: '110px' }}>Embeddings: </label>
                    <select
                        id="ollama-embedding-model"
                        value={embeddingModel}
                        onChange={(e) => setEmbeddingModel(e.target.value)}
                        style={{ width: '250px', marginLeft: '8px' }}
                        disabled={ollamaStatus !== 'online' || availableEmbeddingModels.length === 0 || indexing}
                    >
                        {availableEmbeddingModels.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                    <StyledButton onClick={handleIndexBlog} disabled={indexing || ollamaStatus !== 'online'}>
                        Index my blog
                    </StyledButton>
                    {indexingResult && !indexing && (
                        <span style={{ fontSize: '0.8em', color: isDark ? '#AAA' : '#555', marginLeft: '1rem' }}>
                            {indexingResult.count} posts indexed at {indexingResult.timestamp?.toLocaleTimeString()}
                        </span>
                    )}
                </div>
                {indexing && (
                    <IndexingProgress title={currentlyIndexing} progress={progress} isDark={isDark} />
                )}
            </div>

            <div style={{ position: 'relative', width: '60%', marginTop: '4rem' }}>
                <img
                    src="/img/goku_waiting_for_embeds.webp"
                    alt="Goku waiting for embeddings"
                    style={{
                        position: 'absolute',
                        bottom: 'calc(100% - 15px)',
                        left: '10px',
                        height: '65px',
                        opacity: !indexingResult ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />
                <img
                    src="/img/goku_has_embeddings.webp"
                    alt="Goku has embeddings"
                    style={{
                        position: 'absolute',
                        bottom: 'calc(100% - 15px)',
                        left: '10px',
                        height: '65px',
                        opacity: indexingResult ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}
                />
                <Clock color={aiTextColor} />
                <Terminal history={history} onSendMessage={handleSendMessage} isLoading={isLoading} aiTextColor={aiTextColor} />
            </div>
        </CenteredContainer>
    );
};

export default ChatPage; 