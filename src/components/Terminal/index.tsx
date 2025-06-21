import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Source from './Source';

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

const Clock = () => {
    const [dateTime, setDateTime] = useState('');
    const [icon, setIcon] = useState('🌎');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // First, get the specific gridpoint URL for NYC
                const pointsResponse = await fetch('https://api.weather.gov/points/40.71,-74.01');
                if (!pointsResponse.ok) throw new Error('Failed to fetch weather points');
                const pointsData = await pointsResponse.json();
                const forecastUrl = pointsData.properties.forecastHourly;

                // Then, get the hourly forecast
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

    useEffect(() => {
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
        <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '0.9em' }}>
            NYC {icon}, {dateTime}
        </div>
    );
};

export type Message = {
    text: string;
    sender: 'user' | 'ai' | 'error';
    source?: {
        url: string;
        title: string;
        thumbnail: string;
    }
};

interface TerminalProps {
    history: Message[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    aiTextColor: string;
}

export const Terminal = ({ history, onSendMessage, isLoading, aiTextColor }: TerminalProps) => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const terminalStyle: React.CSSProperties = {
        position: 'relative',
        overflow: 'hidden',
        color: isDark ? 'white' : 'black',
        fontFamily: 'monospace',
        padding: '20px',
        height: '500px',
        width: '100%',
        borderRadius: '5px',
        boxShadow: `0 0 12px 4px ${isDark ? 'rgba(255, 255, 0, 0.5)' : 'rgba(0, 0, 255, 0.3)'}`,
        transition: 'box-shadow 0.3s ease-in-out',
    };

    const contentStyle: React.CSSProperties = {
        position: 'relative',
        zIndex: 1,
        height: '100%',
        overflowY: 'auto'
    }

    const backgroundImage = isDark ? 'url(/img/terminal_bg_dark.png)' : 'url(/img/terminal_bg_light.png)';

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
    const inputRef = React.useRef<HTMLInputElement>(null);

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
    });

    React.useEffect(() => {
        if (!isLoading) {
            inputRef.current?.focus({ preventScroll: true });
        }
    }, [isLoading]);

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
                return { ...baseStyle, color: aiTextColor };
            case 'error':
                return { ...baseStyle, color: '#ff0000' };
            default:
                return { ...baseStyle, color: isDark ? 'white' : 'black' };
        }
    };

    const placeholderColor = isDark ? 'rgba(255, 255, 255, 0.5)' : '#6c757d';

    return (
        <>
            <style>
                {`
                    #terminal-container::before {
                        content: '';
                        position: absolute;
                        top: 0; left: 0; right: 0; bottom: 0;
                        background-image: ${backgroundImage};
                        background-size: cover;
                        background-position: bottom;
                        background-repeat: no-repeat;
                        filter: blur(2px);
                        z-index: 0;
                    }
                    #terminal-input::placeholder {
                        color: ${placeholderColor};
                        opacity: 1; /* Firefox */
                    }
                `}
            </style>
            <div id="terminal-container" style={terminalStyle}>
                <div style={contentStyle}>
                    {history.map((line, index) => {
                        const key = `${line.sender}-${line.text.slice(0, 20)}-${index}`;
                        if (line.sender === 'ai') {
                            const isLarge = line.text.split('\n').length >= 3;
                            return (
                                <div key={key} style={{ position: 'relative', marginBottom: '1em' }}>
                                    <div style={getSenderStyle(line.sender)}>
                                        {line.text}
                                    </div>
                                    {line.source && <Source {...line.source} isLarge={isLarge} />}
                                </div>
                            );
                        }
                        return (
                            <div key={key} style={getSenderStyle(line.sender)}>
                                {line.sender === 'user' ? `> ${line.text}` : line.text}
                            </div>
                        );
                    })}
                    {!isLoading && (
                        <div style={inputLineStyle}>
                            <span style={promptStyle}>&gt;</span>
                            <input
                                ref={inputRef}
                                id="terminal-input"
                                type="text"
                                style={inputStyle}
                                value={input}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                                placeholder="Type your message..."
                                disabled={isLoading}
                                autoComplete="off"
                            />
                        </div>
                    )}
                    <div ref={endOfMessagesRef} />
                </div>
            </div>
        </>
    );
};

export default Terminal; 