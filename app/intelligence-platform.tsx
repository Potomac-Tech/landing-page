'use client';
/* oxlint-disable next/no-img-element -- preserve the supplied product screenshots. */

import { useState } from 'react';
import { ArrowUpRight, Layers, Globe2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const products = [
  {
    id: 'explorer',
    name: 'Cabeus Explorer',
    status: 'Live',
    action: 'Discover · media + market reach',
    description:
      'Track the people, missions, policy, and capital shaping the lunar market.',
  },
  {
    id: 'nexus',
    name: 'Nexus Terminal',
    status: 'Live',
    action: 'Visualize · model + decide',
    description:
      'Combines GIS visualizations and tools with a lunar digital twin.',
  },
  {
    id: 'terminal',
    name: 'Cabeus Terminal',
    status: 'Coming soon',
    action: 'Understand · fund + navigate',
    description:
      'Delivers market insights, funding opportunities, government affairs intelligence, and more.',
  },
];

function ProductImage({ view, alt }: { view: string; alt: string }) {
  return (
    <div className={`product-screenshot screenshot-${view}`}>
      <img
        src="/product-previews.webp"
        alt={alt}
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export function IntelligencePlatform() {
  const [nexusView, setNexusView] = useState('gis');
  return (
    <section className="platform-section" id="intelligence-platform">
      <div className="platform-heading">
        <p className="eyebrow">The lunar intelligence stack</p>
        <h2>
          One data engine.<em>The front door to the Moon.</em>
        </h2>
      </div>
      <Tabs
        defaultValue="explorer"
        orientation="vertical"
        className="product-showcase"
      >
        <TabsList
          className="product-selectors"
          aria-label="Explore the intelligence platforms"
        >
          {products.map((product, index) => (
            <TabsTrigger
              key={product.id}
              value={product.id}
              className="product-selector"
            >
              <span className="selector-number">0{index + 1}</span>
              <span className="selector-copy">
                <span className="selector-heading">
                  <strong>{product.name}</strong>
                  <span
                    className={`product-status ${product.id === 'terminal' ? 'product-status-soon' : ''}`}
                  >
                    {product.status}
                  </span>
                </span>
                <span className="selector-action">{product.action}</span>
                <span className="selector-description">
                  {product.description}
                </span>
              </span>
              <ArrowUpRight size={20} aria-hidden="true" />
            </TabsTrigger>
          ))}
        </TabsList>
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
            <div className="preview-story">
              <p className="eyebrow">Follow the market</p>
              <h3>Know which developments deserve your attention.</h3>
              <p>
                Put mission announcements, policy, and capital in context before
                your next investment or partnership conversation.
              </p>
              <a
                className="preview-link"
                href="https://www.cabeusexplorer.com"
                target="_blank"
                rel="noreferrer"
              >
                Explore Cabeus <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
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
            <div className="preview-story">
              <p className="eyebrow">Understand the ground</p>
              <h3>Compare the conditions that shape a site decision.</h3>
              <p>
                Explore lunar terrain through GIS visualizations and tools, then
                examine the surface in a lunar digital twin.
              </p>
              <a
                className="preview-link"
                href="https://nexus-explore.potomacdb.com/0auth"
                target="_blank"
                rel="noreferrer"
              >
                Open Nexus Terminal{' '}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
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
            <div className="preview-story">
              <p className="eyebrow">Connect the opportunity</p>
              <h3>Find the signals that shape your next move.</h3>
              <p>
                Market insights, funding opportunities, and government affairs
                intelligence in one place. Preview shown; access is coming soon.
              </p>
              <a
                className="preview-link"
                href="#briefing"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent('potomac:inquiry', {
                      detail: 'Cabeus Terminal early access',
                    }),
                  )
                }
              >
                Request early access{' '}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
