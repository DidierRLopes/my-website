import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';

function IntelligencePage() {
  return (
    <Layout
      title="Intelligence"
      description="A visual 'second brain' showcasing the connections between blog posts."
    >
      <Head>
        <title>Intelligence | Didier Lopes</title>
        <meta
          property="og:title"
          content="Intelligence | Second Brain by Didier Lopes"
        />
        <meta
          name="description"
          content="Explore the interconnected ideas in my blog through a dynamic graph visualization."
        />
      </Head>
      <main style={{ padding: '2rem' }}>
        <div className="intelligence-page-desktop">
            <div style={{ maxWidth: '90%', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1>Intelligence</h1>
                </div>
                <BrowserOnly fallback={<div>Loading graph...</div>}>
                    {() => {
                        const GraphContainer = require('../components/Intelligence/GraphContainer').default;
                        return <GraphContainer />;
                    }}
                </BrowserOnly>
            </div>
        </div>
        <div className="intelligence-page-mobile">
            <div style={{ textAlign: 'center', padding: '2rem', position: 'relative' }}>
                <img src="/img/second_brain.png" alt="Second Brain" style={{ width: '100%', filter: 'blur(2px)' }} />
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--ds-font-size-xl)',
                    fontWeight: '500',
                    fontFamily: 'var(--ds-font-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--ds-letter-spacing)',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: '4px'
                }}>
                    Visualize my second brain on desktop
                </div>
            </div>
        </div>
      </main>
    </Layout>
  );
}

export default IntelligencePage; 