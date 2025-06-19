import React, { useEffect, useRef } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function TickerTape() {
  const container = useRef(null);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM || !container.current) {
      return;
    }

    const createWidget = () => {
      // Clear existing children
      while (container.current.firstChild) {
        container.current.removeChild(container.current.firstChild);
      }

      // Placeholder where TradingView will inject the widget
      const widgetContainer = document.createElement('div');
      widgetContainer.className = 'tradingview-widget-container__widget';
      container.current.appendChild(widgetContainer);

      // Hidden copyright link (required by TradingView terms)
      const copyright = document.createElement('div');
      copyright.className = 'tradingview-widget-copyright';
      // Keep element in layout but invisible to users
      copyright.style.opacity = '0';
      copyright.style.height = '0px';
      copyright.style.pointerEvents = 'none';
      copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
      container.current.appendChild(copyright);

      // Script that loads the widget
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.type = 'text/javascript';
      script.async = true;

      const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';

      const widgetConfig = {
        symbols: [
          { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500 Index' },
          { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
          { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
          { proName: 'NASDAQ:TSLA', title: 'Tesla' },
          { proName: 'NASDAQ:AAPL', title: 'Apple' },
          { proName: 'NASDAQ:META', title: 'Meta' },
          { proName: 'NASDAQ:GOOGL', title: 'Google' },
          { proName: 'NASDAQ:MSFT', title: 'Microsoft' },
          { proName: 'NASDAQ:NVDA', title: 'Nvidia' },
          { proName: 'NASDAQ:AMZN', title: 'Amazon' },
        ],
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: 'adaptive',
        colorTheme: isDarkTheme ? 'dark' : 'light',
        locale: 'en',
      };

      script.innerHTML = JSON.stringify(widgetConfig);

      container.current.appendChild(script);
    };

    createWidget();

    // Update widget when theme changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-theme'
        ) {
          createWidget();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ marginBottom: 0, lineHeight: 0 }}
    />
  );
} 