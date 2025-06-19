import React from 'react';
import Layout from '@theme/Layout';
import { DSButton, DSCard, DSTag, DSHeading, DSDivider, DSStatBlock, DSIndicator } from '../components/DesignSystem';

export default function DesignSystemDemo() {
  return (
    <Layout
      title="Design System Demo"
      description="Demonstration of the Dark Ops Intelligence UI Design System"
    >
      <main className="container mx-auto p-ds-4">
        <DSHeading level={1} className="mb-ds-6">
          Design System Demo
        </DSHeading>
        
        <DSCard className="mb-ds-6">
          <DSHeading level={2} className="mb-ds-4">
            Typography & Headings
          </DSHeading>
          <DSHeading level={1}>H1 - Mission Critical</DSHeading>
          <DSHeading level={2}>H2 - System Status</DSHeading>
          <DSHeading level={3}>H3 - Sector Analysis</DSHeading>
          <DSHeading level={4}>H4 - Operational Details</DSHeading>
          <DSHeading level={5}>H5 - Technical Specs</DSHeading>
          <p className="ds-text-gray-light mt-ds-4">
            This is body text using the primary monospace font. It maintains readability while providing that terminal aesthetic.
          </p>
          <p className="ds-text-gray-medium ds-text-sm">
            Secondary text for metadata and less important information.
          </p>
        </DSCard>

        <DSCard className="mb-ds-6">
          <DSHeading level={2} className="mb-ds-4">
            Buttons & Actions
          </DSHeading>
          <div className="flex gap-ds-4 flex-wrap mb-ds-4">
            <DSButton>Default Action</DSButton>
            <DSButton variant="ghost">Ghost Button</DSButton>
            <DSButton variant="chevron">Join Mission</DSButton>
            <DSButton disabled>Disabled</DSButton>
          </div>
          <DSButton href="/blog" variant="chevron">
            View Blog Posts
          </DSButton>
        </DSCard>

        <DSCard className="mb-ds-6">
          <DSHeading level={2} className="mb-ds-4">
            Status Tags & Indicators
          </DSHeading>
          <div className="flex gap-ds-3 flex-wrap mb-ds-4">
            <DSTag variant="red">HIGH RISK</DSTag>
            <DSTag variant="orange">MEDIUM</DSTag>
            <DSTag variant="gray">LOW</DSTag>
          </div>
          <div className="flex gap-ds-4 items-center">
            <div className="flex items-center">
              <DSIndicator variant="red" blinking />
              <span className="ds-text-red ml-ds-2">ALERT</span>
            </div>
            <div className="flex items-center">
              <DSIndicator variant="orange" />
              <span className="ds-text-orange ml-ds-2">WARNING</span>
            </div>
            <div className="flex items-center">
              <DSIndicator variant="gray" />
              <span className="ds-text-muted ml-ds-2">NORMAL</span>
            </div>
          </div>
        </DSCard>

        <DSCard className="mb-ds-6">
          <DSHeading level={2} className="mb-ds-4">
            Stat Blocks
          </DSHeading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-ds-4 mb-ds-4">
            <DSStatBlock>
              <DSIndicator variant="red" />
              <div>
                <div className="ds-text-white ds-text-lg">127</div>
                <div className="ds-text-gray-medium ds-text-xs">THREATS DETECTED</div>
              </div>
            </DSStatBlock>
            <DSStatBlock>
              <DSIndicator variant="orange" />
              <div>
                <div className="ds-text-white ds-text-lg">42</div>
                <div className="ds-text-gray-medium ds-text-xs">SYSTEMS MONITORED</div>
              </div>
            </DSStatBlock>
            <DSStatBlock>
              <DSIndicator variant="gray" />
              <div>
                <div className="ds-text-white ds-text-lg">99.8%</div>
                <div className="ds-text-gray-medium ds-text-xs">UPTIME</div>
              </div>
            </DSStatBlock>
          </div>
          
          <DSHeading level={3} className="mb-ds-3">
            Vertical Stat Block
          </DSHeading>
          <DSStatBlock orientation="vertical">
            <div className="ds-text-white ds-text-xl">1,337</div>
            <div className="ds-text-gray-medium ds-text-xs">TOTAL OPERATIONS</div>
            <DSTag variant="red">CLASSIFIED</DSTag>
          </DSStatBlock>
        </DSCard>

        <DSCard className="mb-ds-6">
          <DSHeading level={2} className="mb-ds-4">
            Layout & Dividers
          </DSHeading>
          <p className="ds-text-gray-light mb-ds-4">
            This demonstrates the card container with proper spacing and borders.
          </p>
          <DSDivider />
          <p className="ds-text-gray-light mb-ds-4">
            Content separated by a solid divider.
          </p>
          <DSDivider variant="dashed" width="half" />
          <p className="ds-text-gray-light">
            Content with a half-width dashed divider.
          </p>
        </DSCard>

        <DSCard variant="semi-black" className="mb-ds-6">
          <DSHeading level={2} className="mb-ds-4">
            Semi-Black Card Variant
          </DSHeading>
          <p className="ds-text-gray-light">
            This card uses the semi-black background variant for subtle layering effects.
          </p>
        </DSCard>

        <DSCard className="mb-ds-6">
          <DSHeading level={2} className="mb-ds-4">
            Color Palette
          </DSHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-ds-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-black border border-ds-gray-light mx-auto mb-ds-2"></div>
              <div className="ds-text-xs ds-text-gray-medium">BLACK</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-white mx-auto mb-ds-2"></div>
              <div className="ds-text-xs ds-text-gray-medium">WHITE</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-red-accent mx-auto mb-ds-2"></div>
              <div className="ds-text-xs ds-text-gray-medium">RED ACCENT</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-orange-warn mx-auto mb-ds-2"></div>
              <div className="ds-text-xs ds-text-gray-medium">ORANGE WARN</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-gray-light mx-auto mb-ds-2"></div>
              <div className="ds-text-xs ds-text-gray-medium">GRAY LIGHT</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-gray-medium mx-auto mb-ds-2"></div>
              <div className="ds-text-xs ds-text-gray-medium">GRAY MEDIUM</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-gray-dark mx-auto mb-ds-2"></div>
              <div className="ds-text-xs ds-text-gray-medium">GRAY DARK</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-ds-gray-muted mx-auto mb-ds-2"></div>
              <div className="ds-text-xs ds-text-gray-medium">GRAY MUTED</div>
            </div>
          </div>
        </DSCard>
      </main>
    </Layout>
  );
}