import type { Metadata } from 'next';
import { Barlow, Barlow_Semi_Condensed } from 'next/font/google';
import './globals.css';
import './scroll-story.css';

const barlow = Barlow({
  variable: '--font-barlow',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const barlowDisplay = Barlow_Semi_Condensed({
  variable: '--font-barlow-display',
  subsets: ['latin'],
  weight: ['600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://potomac-lunar-markets.jacob-russell-matthe.chatgpt.site',
  ),
  title: 'Potomac — Leaders of the Lunar Data Market',
  description:
    "Potomac collects proprietary data from the Moon's surface to better inform space industrialists financing, building, and securing the Moon.",
  icons: {
    icon: { url: '/favicon.png?v=ebd1565aad1a', type: 'image/png' },
  },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Potomac',
    title: 'Potomac — Leaders of the Lunar Data Market',
    description: 'One data engine. The front door to the Moon.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Potomac — Leaders of the Lunar Data Market. Pathfinder lunar scout.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Potomac — Leaders of the Lunar Data Market',
    description: 'One data engine. The front door to the Moon.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${barlow.variable} ${barlowDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
