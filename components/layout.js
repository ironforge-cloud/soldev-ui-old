import Head from "next/head";
import Nav from "./nav";
import PropTypes from "prop-types";

// Wallet Auth
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
// App Context
import { AppWrapper } from "../context/AppContext";
import dynamic from "next/dynamic";

const WalletConnectionProvider = dynamic(
  () => import("../components/wallet-connection-provider"),
  {
    ssr: false,
  }
);

export function Container({ children, metaTags }) {
  return (
    <div>
      <Head>
        <title>{metaTags.title}</title>
        <meta name="title" content={metaTags.title} />
        <meta name="description" content={metaTags.description} />

        {/* Google */}
        {metaTags.shouldIndex ? (
          <>
            {" "}
            <meta name="robots" content="index,follow,noodp" />
            <meta name="googlebot" content="index,follow" />
          </>
        ) : (
          <>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
          </>
        )}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta
          property="og:image"
          content={
            metaTags.img ? metaTags.img : "https://soldev.app/logo-circle.png"
          }
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content={metaTags.img ? "summary_large_image" : "summary"}
        />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta name="twitter:url" content={metaTags.url} />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta
          name="twitter:image"
          content={
            metaTags.img ? metaTags.img : "https://soldev.app/logo-circle.png"
          }
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WalletConnectionProvider>
        <WalletModalProvider logo="/logo-white.png">
          <AppWrapper>
            <Nav>{children}</Nav>
          </AppWrapper>
        </WalletModalProvider>
      </WalletConnectionProvider>
    </div>
  );
}

Container.propTypes = {
  metaTags: PropTypes.object.isRequired,
};
