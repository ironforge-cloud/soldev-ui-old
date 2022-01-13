import Script from "next/script";
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
    <>
      <Script
        id="1"
        src="https://www.googletagmanager.com/gtag/js?id=G-HT8DFYDG03"
      />
      <Script
        id="2"
        dangerouslySetInnerHTML={{
          __html: `
          if (window.location.hostname === "localhost") window['ga-disable-G-HT8DFYDG03'] = true;
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HT8DFYDG03');
          `,
        }}
      />
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
    </>
  );
}
