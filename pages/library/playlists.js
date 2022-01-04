import Head from "next/head";
import dynamic from "next/dynamic";

const Videos = dynamic(() => import("../../components/videos"));

export default function Video() {
  return (
    <div>
      <Head>
        <title>SolDev: Library</title>
        <meta name="title" content="SolDev: Video Playlists" />
        <meta name="og:title" content="SolDev: Video Playlists" />
        <meta
          name="description"
          content="Watch Solana conferences, live streams and stay up to date with the latest Podcasts"
        />
        <meta
          name="og:description"
          content="Watch Solana conferences, live streams and stay up to date with the latest Podcasts"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="robot" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Videos />
    </div>
  );
}
