import Script from "next/script";
import "tailwindcss/tailwind.css";

// FontAwesome
import { config, library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(fab, fas);

// TODO: Optimize by importing just what is being used
import "swiper/css/bundle";

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
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
