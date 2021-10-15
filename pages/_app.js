import Script from "next/script";
import "tailwindcss/tailwind.css";

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

SwiperCore.use([Virtual, Navigation, Keyboard, Mousewheel, Autoplay, A11y]);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <script
        defer
        data-domain="soldev.app"
        src="https://plausible.io/js/plausible.js"
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
