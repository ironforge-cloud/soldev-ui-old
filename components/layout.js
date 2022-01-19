import Head from "next/head";
import Nav from "./nav";
import PropTypes from "prop-types";

export function Container({ children, metaTags }) {
  return (
    <>
      <Head>
        <title>{metaTags.title}</title>
        <meta name="title" content={metaTags.title} />
        <meta name="description" content={metaTags.description} />

        {/* Google */}
        <meta name="robots" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta name="twitter:url" content={metaTags.url} />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.image} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav>{children}</Nav>
    </>
  );
}

Container.propTypes = {
  metaTags: PropTypes.object.isRequired,
};
