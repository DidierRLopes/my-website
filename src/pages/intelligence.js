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
            <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h1>Intelligence</h1>
                <p>This page is best viewed on a desktop device.</p>
            </div>
        </div>
      </main>
    </Layout>
  );
}

export default IntelligencePage; 