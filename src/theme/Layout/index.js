import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import {useLocation} from '@docusaurus/router';
import NewsletterModal from '@site/src/components/NewsletterModal';

export default function Layout(props) {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog');

  return (
    <>
      <OriginalLayout {...props} />
      {isBlogPage && <NewsletterModal />}
    </>
  );
}