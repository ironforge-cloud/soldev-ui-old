import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Promoted from "../../components/videos/promoted";
import Playlists from "../../components/videos/playlists";

export async function getStaticProps() {
  const promotedResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/promoted`
  );
  const playlistsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`
  );

  const promoted = await promotedResponse.json();
  const playlists = await playlistsResponse.json();

  return {
    props: { promoted, playlists },
    revalidate: 60,
  };
}

export default function Video({ promoted, playlists }) {
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

      <main className="flex-1 relative z-0 overflow-hidden focus:outline-none">
        {/* Promoted videos */}
        <Promoted data={promoted} />

        {/* Playlists */}
        <Playlists data={playlists} />
      </main>
    </div>
  );
}
