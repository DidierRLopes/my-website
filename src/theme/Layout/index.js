import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import NewsletterModal from '@site/src/components/NewsletterModal';

export default function Layout(props) {
  return (
    <>
      <OriginalLayout {...props} />
      <NewsletterModal />
    </>
  );
}