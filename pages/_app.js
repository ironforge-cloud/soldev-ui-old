import "tailwindcss/tailwind.css";

// FontAwesome
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(fab, fas);

import PlausibleProvider from "next-plausible";
import Nav from "../components/nav";
import dynamic from "next/dynamic";
import Script from "next/script";

// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/navigation";
import "swiper/css/keyboard";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import "swiper/css/a11y";

import SwiperCore, {
  Virtual,
  Navigation,
  Keyboard,
  Mousewheel,
  Autoplay,
  A11y,
} from "swiper";

SwiperCore.use([Virtual, Navigation, Keyboard, Mousewheel, Autoplay, A11y]);

// Wallet Auth
import "@solana/wallet-adapter-react-ui/styles.css";
const WalletConnectionProvider = dynamic(
  () => import("../components/wallet-connection-provider"),
  {
    ssr: false,
  }
);
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// App Context
import { AppWrapper } from "../context/AppContext";

export default function App({ Component, pageProps }) {
  return (
    <div>
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
