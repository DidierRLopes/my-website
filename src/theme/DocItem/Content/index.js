import React from 'react';
import Content from '@theme-original/DocItem/Content';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import SectionTabs from '@site/src/components/General/SectionTabs';

// Docs pages have no sidebar (sidebarPath: false); sibling pages are tabs above the title.
export default function ContentWrapper(props) {
  const { metadata } = useDoc();
  return (
    <>
      <SectionTabs permalink={metadata.permalink} />
      <Content {...props} />
    </>
  );
}
