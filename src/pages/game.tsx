import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function GamePage(): JSX.Element {
  return (
    <Layout title="Pokeball Game" noFooter>
      <Head>
        <style>{`
          html, body {
            overflow: hidden !important;
            height: 100% !important;
          }
        `}</style>
      </Head>
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ flex: 1, minHeight: 0 }}>
          <BrowserOnly fallback={<div style={{ height: "100%" }} />}>
            {() => {
              const AsteroidGame =
                require("@site/src/components/AsteroidGame/AsteroidGame").default;
              return <AsteroidGame />;
            }}
          </BrowserOnly>
        </div>
      </div>
    </Layout>
  );
}
