import React from 'react';

interface NewsletterCTAProps {
  variant?: 'default' | 'compact';
}

export default function NewsletterCTA({ variant = 'default' }: NewsletterCTAProps) {
  const isCompact = variant === 'compact';

  // Default variant: simple centered button for blog posts
  if (!isCompact) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
          marginBottom: '1rem',
        }}
      >
        <a
          href="https://substack.com/@didierrlopes"
          target="_blank"
          rel="noopener noreferrer"
          className="mission-button"
          style={{
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            padding: '12px 24px',
            fontSize: '14px',
          }}
        >
          Subscribe to my newsletter
          <span style={{ marginLeft: '6px' }}>»</span>
        </a>
      </div>
    );
  }

  // Compact variant: card style for homepage
  return (
    <div
      style={{
        background: 'var(--mission-card-bg)',
        border: '1px solid var(--mission-card-border)',
        borderRadius: 'var(--mission-border-radius)',
        padding: '16px 20px',
        fontFamily: 'var(--mission-font-family)',
        color: 'var(--mission-text-color)',
        marginTop: '2rem',
        marginBottom: '1rem',
        boxShadow: 'var(--mission-box-shadow)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              marginBottom: '4px',
              color: 'var(--ds-gray-medium)',
            }}
          >
            Newsletter
          </div>
          <div
            style={{
              fontSize: '14px',
              lineHeight: 1.5,
            }}
          >
            Get updates on AI, open source, startups and finance.
          </div>
        </div>
        <a
          href="https://substack.com/@didierrlopes"
          target="_blank"
          rel="noopener noreferrer"
          className="mission-button"
          style={{
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Subscribe
          <span style={{ marginLeft: '4px' }}>»</span>
        </a>
      </div>
    </div>
  );
}
