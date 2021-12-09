const { withSentryConfig } = require("@sentry/nextjs");
const { withPlausibleProxy } = require("next-plausible");

const withTM = require("next-transpile-modules")([
  "@project-serum/sol-wallet-adapter",
  "@solana/wallet-adapter-base",
  "@solana/wallet-adapter-react",
  "@solana/wallet-adapter-wallets",
  "@solana/wallet-adapter-react-ui",
  "@solana/wallet-adapter-phantom",
]);

const moduleExports = withPlausibleProxy()(
  withTM({
    experimental: {},
    swcMinify: true,
    reactStrictMode: true,
    images: {
      domains: [
        "i.ytimg.com",
        "images.unsplash.com",
        "solana.com",
        "static-cdn.jtvnw.net",
        "clips-media-assets2.twitch.tv",
        "www.youtube.com",
        "pbs.twimg.com",
      ],
      formats: ["image/avif", "image/webp"],
    },
    async rewrites() {
      return [
        {
          source: "/",
          destination: "/library",
        },
      ];
    },
  })
);

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
