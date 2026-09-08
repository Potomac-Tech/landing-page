'use client';
/* oxlint-disable next/no-img-element -- preserve the supplied product screenshots. */

import { useState } from 'react';
import { ArrowUpRight, Layers, Globe2 } from 'lucide-react';
import { TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useStoryProduct } from './scroll-story';

const products = [
  {
    id: 'explorer',
    name: 'Cabeus Explorer',
    status: 'Live',
    action: 'Discover · media + market reach',
    description:
      'Track the people, missions, policy, and capital shaping the lunar market.',
    eyebrow: 'Follow the market',
    headline: 'Know which developments deserve your attention.',
    detail:
      'Put mission announcements, policy, and capital in context before your next investment or partnership conversation.',
    href: 'https://www.cabeusexplorer.com',
    link: 'Explore Cabeus',
  },
  {
    id: 'nexus',
    name: 'Nexus Terminal',
    status: 'Live',
    action: 'Visualize · model + decide',
    description:
      'Combines GIS visualizations and tools with a lunar digital twin.',
    eyebrow: 'Understand the ground',
    headline: 'Compare the conditions that shape a site decision.',
    detail:
      'Explore lunar terrain through GIS visualizations and tools, then examine the surface in a lunar digital twin.',
    href: 'https://nexus-explore.potomacdb.com/0auth',
    link: 'Open Nexus Terminal',
  },
  {
    id: 'terminal',
    name: 'Cabeus Terminal',
    status: 'Coming soon',
    action: 'Understand · fund + navigate',
    description:
      'Delivers market insights, funding opportunities, government affairs intelligence, and more.',
    eyebrow: 'Connect the opportunity',
    headline: 'Find the signals that shape your next move.',
    detail:
      'Market insights, funding opportunities, and government affairs intelligence in one place. Preview shown; access is coming soon.',
    href: '#briefing',
    link: 'Request early access',
  },
];

function ProductImage({ view, alt }: { view: string; alt: string }) {
  return (
    <div className={'product-screenshot screenshot-' + view}>
      <img
        src="/product-previews.webp"
        alt={alt}
        width={1600}
        height={900}
        loading="eager"
        fetchPriority="low"
        decoding="async"
      />
    </div>
  );
}

export function IntelligencePlatform() {
  const selected = useStoryProduct();
  const product = products.find((item) => item.id === selected) ?? products[0];
  return (
    <section
      className="platform-section"
      id="intelligence-platform"
      data-story-scene="platform"
    >
      <div className="platform-heading">
        <p className="eyebrow">The lunar intelligence stack</p>
        <h2>
          One data engine.<em>The front door to the Moon.</em>
        </h2>
      </div>
      <TabsList
        className="product-selectors"
        aria-label="Explore the intelligence platforms"
      >
        {products.map((item, index) => (
          <TabsTrigger
            key={item.id}
            value={item.id}
            className="product-selector"
          >
            <span className="selector-number">0{index + 1}</span>
            <span className="selector-copy">
              <span className="selector-heading">
                <strong>{item.name}</strong>
                <span
                  className={
                    'product-status ' +
                    (item.id === 'terminal' ? 'product-status-soon' : '')
                  }
                >
                  {item.status}
                </span>
              </span>
              <span className="selector-action">{item.action}</span>
              <span className="selector-description">{item.description}</span>
            </span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="preview-story">
        <p className="eyebrow">{product.eyebrow}</p>
        <h3>{product.headline}</h3>
        <p>{product.detail}</p>
        <a
          className="preview-link"
          href={product.href}
          target={product.id === 'terminal' ? undefined : '_blank'}
          rel={product.id === 'terminal' ? undefined : 'noreferrer'}
          onClick={() => {
            if (product.id === 'terminal') {
              window.dispatchEvent(
                new CustomEvent('potomac:inquiry', {
                  detail: 'Cabeus Terminal early access',
                }),
              );
            }
          }}
        >
          {product.link} <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function IntelligencePlatformVisual() {
  const [nexusView, setNexusView] = useState('gis');
  return (
    <div className="preview-panels">
      <TabsContent value="explorer" className="product-preview">
        <div className="preview-toolbar">
          <span>Cabeus Explorer</span>
          <span>Product preview</span>
        </div>
        <ProductImage
          view="explorer"
          alt="Cabeus Explorer homepage with Clarity in the New Space Age headline and lunar imagery"
        />
      </TabsContent>
      <TabsContent value="nexus" className="product-preview">
        <div className="preview-toolbar">
          <span>Nexus Terminal</span>
          <span>Product preview</span>
        </div>
        <fieldset
          className="preview-view-switch"
          aria-label="Choose Nexus preview"
        >
          <button
            type="button"
            aria-pressed={nexusView === 'gis'}
            onClick={() => setNexusView('gis')}
          >
            <Layers size={16} aria-hidden="true" /> GIS layers
          </button>
          <button
            type="button"
            aria-pressed={nexusView === 'twin'}
            onClick={() => setNexusView('twin')}
          >
            <Globe2 size={16} aria-hidden="true" /> Digital twin
          </button>
        </fieldset>
        <ProductImage
          view={nexusView}
          alt={
            nexusView === 'gis'
              ? 'Nexus GIS interface showing Cabeus terrain with imagery, illumination, slope, and resource layers'
              : 'Lunar digital twin interface with a three-dimensional surface model and environmental controls'
          }
        />
      </TabsContent>
      <TabsContent value="terminal" className="product-preview">
        <div className="preview-toolbar">
          <span>Cabeus Terminal</span>
          <span className="coming-soon-label">Coming soon · Preview</span>
        </div>
        <ProductImage
          view="terminal"
          alt="Preview of the forthcoming Cabeus Terminal inquiry interface for market intelligence, contracts, and funding"
        />
      </TabsContent>
    </div>
  );
}
