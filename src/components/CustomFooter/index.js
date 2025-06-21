import React from 'react';
import { useThemeConfig } from '@docusaurus/theme-common';
import TickerTape from '../TickerTape';
import PolymarketTape from '../PolymarketTape';

// Suppress TradingView cross-origin errors during development across the whole site
if (typeof window !== 'undefined') {
  window.addEventListener(
    'error',
    (evt) => {
      if (evt.message === 'Script error.') {
        evt.preventDefault();
        evt.stopImmediatePropagation();
        return false;
      }
    },
    true,
  );

  // Hide the webpack overlay if it still sneaks in
  const style = document.createElement('style');
  style.innerHTML = '#webpack-dev-server-client-overlay { display: none !important; }';
  document.head.appendChild(style);
}

export default function CustomFooter() {
  return (
    <div className="mt-4">
      <PolymarketTape />
      <TickerTape />
      <footer className="bg-[#f8f9fa] dark:bg-[#000] text-[var(--ifm-footer-color)] pb-8">
        <div className="container container-fluid">
          <div className="row flex justify-center items-center">
            <div className="col text-center">
              <h4 className="mb-4">Let's stay in touch.</h4>
              <div className="flex justify-center space-x-4">
                <a href="https://twitter.com/didier_lopes" target="_blank" rel="noreferrer" className="text-black dark:text-white hover:text-ds-blue-primary dark:hover:text-ds-blue-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-label="Twitter">
                    <title>Twitter</title>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/didier-lopes/" target="_blank" rel="noreferrer" className="text-black dark:text-white hover:text-ds-blue-primary dark:hover:text-ds-blue-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn">
                    <title>LinkedIn</title>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://github.com/DidierRLopes" target="_blank" rel="noreferrer" className="text-[#333] dark:text-[#f5f5f5] hover:text-ds-blue-primary dark:hover:text-ds-blue-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub">
                    <title>GitHub</title>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://cal.com/didierlopes/15min" target="_blank" rel="noreferrer" className="text-black dark:text-white hover:text-ds-blue-primary dark:hover:text-ds-blue-accent" aria-label="Book a meeting">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-label="Calendar">
                    <title>Cal.com</title>
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}