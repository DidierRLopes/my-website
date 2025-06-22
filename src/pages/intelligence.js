import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ThemedImage from '@theme/ThemedImage';
import '../../src/css/custom.css';

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
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1>Intelligence</h1>
        </div>
        <div className="intelligence-page-desktop">
            <div style={{ width: '60%', margin: '0 auto' }}>
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
            <ThemedImage
                alt="Second Brain"
                sources={{
                    light: '/img/intelligence_graph_mobile_light.png',
                    dark: '/img/intelligence_graph_mobile_dark.png',
                }}
                style={{ width: '100%', filter: 'blur(2px)' }}
                />
                <div className="intelligence-bubble">
                    Visualize my second brain on desktop
                </div>
            </div>
        </div>
      </main>
    </Layout>
  );
}

export default IntelligencePage; 