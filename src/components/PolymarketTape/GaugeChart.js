import React from 'react';
import styles from './styles.module.css';

const GaugeChart = ({ percentage, gaugeColor }) => {
  const radius = 40;
  const circumference = Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <div className={styles.gaugeContainer}>
      <svg width="40" height="20" viewBox="0 0 100 50" className={styles.gaugeSvg}>
        <title>Market Prediction Gauge</title>
        <path
          className={styles.gaugeBg}
          d="M 10 50 A 40 40 0 0 1 90 50"
          strokeWidth="12"
        />
        <path
          className={styles.gaugeFg}
          d="M 10 50 A 40 40 0 0 1 90 50"
          strokeWidth="12"
          stroke={gaugeColor}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
        <text
          x="50"
          y="45"
          className={styles.gaugeText}
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default GaugeChart; 