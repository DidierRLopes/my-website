import React, { useEffect } from 'react';
import Layout from '@theme/Layout';

export default function Subscribe(): JSX.Element {
  useEffect(() => {
    window.location.href = 'https://didierlopes.beehiiv.com/subscribe';
  }, []);

  return (
    <Layout
      title="Subscribe"
      description="Subscribe to Didier Lopes newsletter"
    >
      <main className="container margin-vert--xl">
        <div className="text--center">
          <h1>Redirecting to Newsletter...</h1>
          <p>
            If you are not redirected automatically,{' '}
            <a href="https://didierlopes.beehiiv.com/subscribe">
              click here to subscribe
            </a>
            .
          </p>
        </div>
      </main>
    </Layout>
  );
}