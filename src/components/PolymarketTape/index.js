import React, { useState, useEffect } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './styles.module.css';
import GaugeChart from './GaugeChart';

const getGaugeColor = (percentage) => {
  const hue = percentage * 1.2;
  return `hsl(${hue}, 90%, 50%)`;
};

const PolymarketTape = () => {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    const fetchMarkets = async () => {
      const apiUrl = 'https://gamma-api.polymarket.com/events?order=createdAt&ascending=false&limit=10';

      const fetchWithProxyFallback = async (useProxy = false) => {
        const url = useProxy
          ? `https://api.allorigins.win/raw?url=${encodeURIComponent(apiUrl)}`
          : apiUrl;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.json();
        } catch (err) {
          if (!useProxy) {
            console.warn('Direct fetch failed, retrying with CORS proxy...', err);
            return fetchWithProxyFallback(true);
          }
          throw err;
        }
      };

      try {
        const data = await fetchWithProxyFallback();
        
        const formattedMarkets = data.map(event => {
          try {
            const market = event.markets[0];
            if (!market || !market.outcomes || !market.outcomePrices) {
              return null;
            }
            
            const outcomes = JSON.parse(market.outcomes);
            const outcomePrices = JSON.parse(market.outcomePrices);

            if (outcomes.length === 0 || outcomePrices.length === 0) {
              return null;
            }
            
            const price = Number.parseFloat(outcomePrices[0]);
            const percentage = Math.round(price * 100);

            return {
              id: event.id,
              title: event.title,
              image: event.image,
              url: `https://polymarket.com/event/${event.slug}`,
              outcomePercentage: percentage,
              gaugeColor: getGaugeColor(percentage),
            };
          } catch (e) {
            console.error('Failed to parse market data for event:', event.id, e);
            return null;
          }
        }).filter(Boolean);

        setMarkets(formattedMarkets);
      } catch (error) {
        console.error('Failed to fetch Polymarket data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  if (loading || !markets.length) {
    return null;
  }
  
  const duplicatedMarkets = [...markets, ...markets];

  return (
    <div className={styles.tapeContainer}>
      <div className={styles.tape}>
        {duplicatedMarkets.map((market, index) => (
          <a href={market.url} target="_blank" rel="noopener noreferrer" key={`${market.id}-${index}`} className={styles.tapeItem}>
            <img src={market.image} alt={market.title} className={styles.marketImage} />
            <span className={styles.title}>{market.title}</span>
            <GaugeChart
              percentage={market.outcomePercentage}
              gaugeColor={market.gaugeColor}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default PolymarketTape; 