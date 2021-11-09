import PlausibleProvider from "next-plausible";
import "tailwindcss/tailwind.css";
import Nav from "../components/nav";
import MiniSocial from "../components/nav/mini-social";
import dynamic from "next/dynamic";

// FontAwesome
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(fab, fas);

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
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { videoID } = router.query;

  const size = videoID ? "2xl" : "xl";

  return (
    <>
      <PlausibleProvider domain="soldev.app" trackOutboundLinks={true}>
        <WalletConnectionProvider>
          <WalletModalProvider logo="/logo-white.png">
            <AppWrapper>
              <Nav>
                <div className="flex-1 flex items-stretch overflow-hidden gap-5">
                  <main className="flex-1 overflow-y-auto">
                    {/* Primary column */}
                    <section
                      aria-labelledby="primary-heading"
                      className="flex-1 min-h-screen flex flex-col overflow-hidden bg-white rounded-lg shadow-lg border"
                    >
                      <Component {...pageProps} />
                    </section>
                  </main>

                  {/* Secondary column (hidden on smaller screens) */}
                  <MiniSocial size={size} />
                </div>
              </Nav>
            </AppWrapper>
          </WalletModalProvider>
        </WalletConnectionProvider>
      </PlausibleProvider>
    </>
  );
}
