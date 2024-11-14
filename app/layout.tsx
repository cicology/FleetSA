import './globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fleet Management PWA',
  description: 'A Progressive Web App for fleet management',
  manifest: '/manifest.json',
  themeColor: '#4CAF50',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  icons: {
    icon: [
      { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { src: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'black-translucent',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest and Icons */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4CAF50" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Apple-specific meta tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Windows-specific meta tags */}
        <meta name="msapplication-TileColor" content="#4CAF50" />
        <meta name="msapplication-TileImage" content="/icons/ms-icon-144x144.png" />

        {/* Social Media / SEO Meta Tags */}
        <meta property="og:title" content="Fleet Management PWA" />
        <meta property="og:description" content="A Progressive Web App for fleet management" />
        <meta property="og:image" content="/icons/icon-512x512.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Fleet Management PWA" />
        <meta name="twitter:description" content="A Progressive Web App for fleet management" />
        <meta name="twitter:image" content="/icons/icon-512x512.png" />
      </head>
      <body className={inter.className}>
        {/* No-JavaScript Fallback */}
        <noscript>You need to enable JavaScript to run this app.</noscript>
        
        {children}

        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(function(registration) {
                      console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    })
                    .catch(function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
