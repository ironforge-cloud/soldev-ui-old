import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import { Analytics } from '@vercel/analytics/react';
import PlausibleProvider from 'next-plausible';
import WalletConnectionProvider from '../components/wallet-connection-provider';

import { AppWrapper } from '../context/AppContext';
import '../style.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <PlausibleProvider domain="soldev.app">
        <WalletConnectionProvider>
          <WalletModalProvider logo="/logo-white.png">
            <AppWrapper>
              <Component {...pageProps} />
              <Analytics />
            </AppWrapper>
          </WalletModalProvider>
        </WalletConnectionProvider>
      </PlausibleProvider>
    </div>
  );
}
