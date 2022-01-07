import Head from "next/head";
import Promoted from "../../components/videos/promoted";
import Playlists from "../../components/videos/playlists";
import fetcher from "../../utils/fetcher";

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
        <title>SolDev: Video Playlists</title>
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
