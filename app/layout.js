import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppProvider';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GrainOverlay from '@/components/GrainOverlay';
import Toast from '@/components/Toast';
import QuickViewModal from '@/components/QuickViewModal';
import ConnectModal from '@/components/ConnectModal';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Fabrikaaya — Handcrafted Indian Fashion Discovery',
  description:
    'Discover handcrafted Indian textiles, save pieces you love, and send connection requests directly to the independent designers behind them.',
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport = {
  themeColor: '#F6F0E6',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--ivory)] text-[var(--ink)] antialiased relative selection:bg-[var(--marigold)] selection:text-[var(--ink)]">
        <AppProvider>
          <GrainOverlay />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuickViewModal />
          <ConnectModal />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
