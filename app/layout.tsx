import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GrooveSync - Sync your moves, share your dance',
  description: 'A social dance practice app for Base users to access tutorials, practice with AI feedback, and connect with virtual dance partners.',
  keywords: ['dance', 'tutorials', 'practice', 'social', 'Base', 'miniapp'],
  authors: [{ name: 'GrooveSync Team' }],
  openGraph: {
    title: 'GrooveSync',
    description: 'Sync your moves, share your dance',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrooveSync',
    description: 'Sync your moves, share your dance',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
