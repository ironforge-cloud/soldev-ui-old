import "../style.css";
import Script from "next/script";

import PlausibleProvider from "next-plausible";

// Wallet Auth
import "@solana/wallet-adapter-react-ui/styles.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
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
        <Component {...pageProps} />
      </PlausibleProvider>
    </div>
  );
}
