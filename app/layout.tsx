import './global.css';

import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://docs.getbram.com'),
  title: {
    default: 'BRAM Docs',
    template: '%s | BRAM Docs',
  },
  description:
    'BRAM is the AI trust platform: govern, observe, and evaluate every model, agent, and tool call.',
  icons: {
    icon: '/images/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <RootProvider
          search={{
            options: {
              type: 'fetch',
            },
            links: [
              ['Quickstart', '/quickstart'],
              ['Open BRAM', 'https://app.getbram.com'],
              ['Support', 'mailto:support@getbram.com'],
            ],
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
