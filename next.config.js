const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const moduleExports = withPlausibleProxy()({
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    legacyBrowsers: false
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        child_process: false
      };
    }

    return config;
  },
  images: {
    domains: [
      'rotatingcanvas.com',
      'arweave.net',
      'nick.af',
      'hashnode.com',
      'cdn.hashnode.com',
      'abs.twimg.com',
      'pbs.twimg.com',
      'cardea.imgix.net',
      'i.ytimg.com',
      'images.unsplash.com',
      'solana.com',
      'static-cdn.jtvnw.net',
      'clips-media-assets2.twitch.tv',
      'www.youtube.com',
      'pbs.twimg.com',
      'opengraph.githubassets.com',
      'res.cloudinary.com',
      'repository-images.githubusercontent.com',
      'figment.io',
      'lorisleiva.com',
      'www.notion.so',
      'dev.to',
      'twitter.com',
      'alexgr.in',
      'avatars.githubusercontent.com',
      'solanacookbook.com',
      'solana.ghost.io',
      'www.gravatar.com',
      'api.typedream.com',
      'blog.neodyme.io',
      'lh4.googleusercontent.com',
      'www.jpmti2016.com',
      'www.crossmint.io'
    ],
    formats: ['image/avif', 'image/webp']
  }
});

module.exports = moduleExports;
