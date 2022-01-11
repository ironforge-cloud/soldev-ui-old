import "tailwindcss/tailwind.css";

import PlausibleProvider from "next-plausible";
import dynamic from "next/dynamic";

// Wallet Auth
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// App Context
import { AppWrapper } from "../context/AppContext";

const Nav = dynamic(() => import("../components/nav"));

const WalletConnectionProvider = dynamic(
  () => import("../components/wallet-connection-provider"),
  {
    ssr: false,
  }
);

export default function App({ Component, pageProps }) {
  return (
    <div>
      <div className="min-h-screen bg-stone-100 dark:bg-stone-900">
        <PlausibleProvider domain="soldev.app" trackOutboundLinks={true}>
          <WalletConnectionProvider>
            <WalletModalProvider logo="/logo-white.png">
              <AppWrapper>
                <Nav>
                  <Component {...pageProps} />
                </Nav>
              </AppWrapper>
            </WalletModalProvider>
          </WalletConnectionProvider>
        </PlausibleProvider>
      </div>
    </div>
  );
}
