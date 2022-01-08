import Head from "next/head";
import fetcher from "../../utils/fetcher";
import dynamic from "next/dynamic";

const Playlists = dynamic(() => import("../../components/videos/playlists"));

const Promoted = dynamic(() => import("../../components/videos/promoted"));

export async function getStaticProps() {
  const promoted = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/promoted`
  );
  const playlists = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`
  );

  return {
    props: { promoted, playlists },
    revalidate: 60,
  };
}

export default function Video({ promoted, playlists }) {
  return (
    <div>
      <Head>
        <title>SolDev - Video Playlists</title>
        <meta name="title" content="SolDev - Video Playlists" />
        <meta
          name="description"
          content="Watch Solana conferences, live streams and stay up to date with the latest Podcasts"
        />

        {/* Google */}
        <meta property="robot" content="index,follow,noodp" />
        <meta property="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.soldev.app/library/playlists"
        />
        <meta property="og:title" content="SolDev - Video Playlists" />
        <meta
          name="og:description"
          content="Watch Solana conferences, live streams and stay up to date with the latest Podcasts"
        />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:site" content="@soldevapp" />
        <meta property="twitter:creator" content="@italoacasas" />
        <meta
          property="twitter:url"
          content="https://www.soldev.app/library/playlists"
        />
        <meta property="twitter:title" content="SolDev - Video Playlists" />
        <meta
          property="twitter:description"
          content="Watch Solana conferences, live streams and stay up to date with the latest Podcasts"
        />
        <meta
          property="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 relative z-0 overflow-hidden focus:outline-none">
        {/* Promoted videos */}
        <Promoted data={promoted} />

        {/* Playlists */}
        <Playlists data={playlists} />
      </main>
    </div>
  );
}
