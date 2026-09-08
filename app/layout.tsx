import type { Metadata } from 'next';
import { Cormorant_Garamond, Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './scroll-story.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://potomac-lunar-markets.jacob-russell-matthe.chatgpt.site',
  ),
  title: 'Potomac — Leaders of the Lunar Data Market',
  description:
    "Potomac collects proprietary data from the Moon's surface to better inform space industrialists financing, building, and securing the Moon.",
  icons: {
    icon: '/favicon.png',
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
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
