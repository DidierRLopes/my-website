import React from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";

function NotFoundContent(): JSX.Element {
  return (
    <div className="relative pt-20 rounded-[14px] shadow-md text-white">
      <div className="mx-auto mt-16 flex max-w-[880px] flex-col px-3 text-center md:mt-16">
        <h1 className="_h1 !mb-2">PAGE NOT FOUND</h1>
        <div className="_subtitle text-lg">
          <span>
            Let Didier know. In the meantime, here&apos;s a fun game.
          </span>
        </div>
      </div>
      <div className="px-2 sm:px-4 py-2.5">
        <BrowserOnly fallback={<div style={{ height: "calc(100vh - 200px)" }} />}>
          {() => {
            const AsteroidGame =
              require("@site/src/components/AsteroidGame/AsteroidGame").default;
            return <AsteroidGame />;
          }}
        </BrowserOnly>
      </div>
    </div>
  );
}

export default function NotFound(): JSX.Element {
  return (
    <Layout title="Page Not Found">
      <NotFoundContent />
    </Layout>
  );
}
