import React, { useState, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import Source from './Source';

const PortalGunIcon = ({ size = 40, style = {} }) => (
    <img 
        src="/img/rickandmorty_portal_gun.webp" 
        alt="Portal Gun"
        style={{ width: size, height: 'auto', ...style }}
        title="Clear terminal"
    />
);

const RubberIcon = ({ color = 'currentColor', size = 20 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Clear terminal</title>
        <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21H7Z" fill="hotpink" />
        <path d="M22 21H7"/>
        <path d="m5 12 5 5"/>
    </svg>
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
    onClearHistory: () => void;
    isClearing: boolean;
    hasBeenCleared: boolean;
}

export const Terminal = ({ history, onSendMessage, isLoading, aiTextColor, onClearHistory, isClearing, hasBeenCleared }: TerminalProps) => {
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
        overflowY: 'auto',
        paddingBottom: '30px',
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
    const contentRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [portalVisible, setPortalVisible] = React.useState(false);

    // Track isClearing transitions to control portal visibility
    React.useEffect(() => {
        if (isDark && isClearing) {
            setPortalVisible(true);
            const timer = setTimeout(() => setPortalVisible(false), 1300); // Match portal animation duration
            return () => clearTimeout(timer);
        }
    }, [isClearing, isDark]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [history.length]);

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
                    @keyframes wipe-zigzag-vertical {
                        0%   { transform: translate(50px, -50px) rotate(60deg); opacity: 1; }
                        12.5% { transform: translate(250px, 25px) rotate(-60deg); }
                        25%  { transform: translate(50px, 100px) rotate(60deg); }
                        37.5% { transform: translate(250px, 175px) rotate(-60deg); }
                        50%  { transform: translate(50px, 250px) rotate(60deg); }
                        62.5% { transform: translate(250px, 325px) rotate(-60deg); }
                        75%  { transform: translate(50px, 400px) rotate(60deg); }
                        87.5% { transform: translate(250px, 475px) rotate(-60deg); }
                        100% { transform: translate(150px, 550px) rotate(60deg); opacity: 0; }
                    }

                    .wiping-eraser {
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 10;
                        animation: wipe-zigzag-vertical 1.5s ease-in-out forwards;
                        color: ${isDark ? 'white' : 'black'};
                    }

                    /* Rick and Morty Dark Mode Animations */
                    @keyframes shoot-portal-gun {
                        0% { transform: translateX(100px) rotate(-30deg); opacity: 0; }
                        25% { transform: translateX(0) rotate(-45deg); opacity: 1; }
                        75% { transform: translateX(0) rotate(-45deg); opacity: 1; }
                        100% { transform: translateX(100px) rotate(-30deg); opacity: 0; }
                    }

                    @keyframes portal-effect {
                        0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0; }
                        30% { transform: translate(-50%, -50%) scale(1) rotate(360deg); opacity: 1; }
                        80% { transform: translate(-50%, -50%) scale(1) rotate(720deg); opacity: 1; }
                        100% { transform: translate(-50%, -50%) scale(0) rotate(1080deg); opacity: 0; }
                    }
                    
                    .portal-gun-animation {
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                        z-index: 10;
                        animation: shoot-portal-gun 1.5s ease-in-out forwards;
                    }

                    .portal-animation {
                        position: absolute;
                        top: 50%;
                        left: calc(50% - 180px);
                        z-index: 9;
                        animation: portal-effect 1.3s ease-in-out; /* Delay start slightly */
                    }
                    
                    .portal-animation img {
                        width: 250px;
                        height: 250px;
                    }
                `}
            </style>
            <div id="terminal-container" style={terminalStyle}>
                {history.length === 0 && hasBeenCleared && !isClearing && (
                    <div style={{
                        position: 'absolute',
                        top: '5px',
                        left: '5px',
                        right: '5px',
                        bottom: '5px',
                        borderRadius: '5px',
                        boxShadow: isDark 
                            ? 'inset 0 0 15px rgba(255, 255, 255, 0.1)' 
                            : 'inset 0 0 15px rgba(0, 0, 0, 0.1)',
                        pointerEvents: 'none',
                    }} />
                )}
                {isClearing && (
                    isDark ? (
                        <>
                            <div className="portal-gun-animation">
                                <PortalGunIcon />
                            </div>
                            {portalVisible && (
                                <div className="portal-animation">
                                    <img src="/img/rickandmorty_portal.webp" alt="Rick and Morty Portal" />
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="wiping-eraser">
                            <RubberIcon />
                        </div>
                    )
                )}
                <button
                    type="button"
                    onClick={onClearHistory}
                    disabled={isClearing}
                    style={{
                        position: 'absolute',
                        bottom: '15px',
                        right: '15px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        zIndex: 5,
                        opacity: history.length === 0 && !isClearing ? 0.5 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '5px',
                        color: isDark ? 'white' : 'black',
                        visibility: isClearing ? 'hidden' : 'visible',
                    }}
                    title="Clear terminal"
                >
                    {isDark ? (!isClearing && <PortalGunIcon size={30} style={{ transform: 'rotate(-45deg)' }} />) : (!isClearing && <RubberIcon />)}
                </button>
                <div 
                    style={{
                        ...contentStyle, 
                        opacity: isClearing && isDark ? 0 : 1, 
                        transition: 'opacity 0.3s ease-out 0.7s'
                    }} 
                    ref={contentRef}
                >
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
                </div>
            </div>
        </>
    );
};

export default Terminal; 