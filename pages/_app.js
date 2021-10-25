import PlausibleProvider from "next-plausible";
import "tailwindcss/tailwind.css";
import Nav from "../components/nav";
import MiniSocial from "../components/nav/mini-social";

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
import Videos from "../components/videos";
import { useRouter } from "next/router";

SwiperCore.use([Virtual, Navigation, Keyboard, Mousewheel, Autoplay, A11y]);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { videoID } = router.query;

  const size = videoID ? "2xl" : "xl";

  return (
    <>
      <PlausibleProvider domain="soldev.app" trackOutboundLinks={true}>
        <Nav>
          <div className="flex-1 flex items-stretch overflow-hidden gap-5 2xl:gap-7">
            <main className="flex-1 overflow-y-auto">
              {/* Primary column */}
              <section
                aria-labelledby="primary-heading"
                className="flex-1 h-full flex flex-col overflow-hidden bg-white rounded-lg shadow-lg border"
              >
                <Component {...pageProps} />
              </section>
            </main>

            {/* Secondary column (hidden on smaller screens) */}
            <MiniSocial size={size} />
          </div>
        </Nav>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
