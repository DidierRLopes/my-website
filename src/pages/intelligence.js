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
        <div style={{ maxWidth: '90%', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1>Intelligence</h1>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                    This page serves as a visual "second brain" by showcasing a graph map that dynamically visualizes relationships between blog posts. Each blog post is represented as a node, with metadata determining its size, color, and connectivity.
                </p>
            </div>
            <BrowserOnly fallback={<div>Loading graph...</div>}>
                {() => {
                    const GraphContainer = require('../components/Intelligence/GraphContainer').default;
                    return <GraphContainer />;
                }}
            </BrowserOnly>
        </div>
      </main>
    </Layout>
  );
}

export default IntelligencePage; 