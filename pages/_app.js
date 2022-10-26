import '../style.css';
import PlausibleProvider from 'next-plausible';
import { Analytics } from '@vercel/analytics/react';

import { AppWrapper } from '../context/AppContext';
import WalletConnectionProvider from '../components/wallet-connection-provider';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <PlausibleProvider domain="soldev.app" trackOutboundLinks={true}>
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
