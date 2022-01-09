import Head from "next/head";
import fetcher from "../../utils/fetcher";
import dynamic from "next/dynamic";

const Playlists = dynamic(() => import("../../components/videos/playlists"));

export async function getStaticProps() {
  const playlists = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`
  );

  return {
    props: { playlists },
    revalidate: 300,
  };
}

export default function Video({ playlists }) {
  return (
    <div>
      <Head>
        <title>SolDev - Playlists</title>
        <meta name="title" content="SolDev - Playlists" />
        <meta
          name="description"
          content="Watch Solana conferences, live streams and stay up to date with the latest Podcasts"
        />

        {/* Google */}
        <meta name="robots" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.soldev.app/library/playlists"
        />
        <meta property="og:title" content="SolDev - Playlists" />
        <meta
          name="og:description"
          content="Watch Solana conferences, live streams and stay up to date with the latest Podcasts"
        />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta
          name="twitter:url"
          content="https://www.soldev.app/library/playlists"
        />
        <meta name="twitter:title" content="SolDev - Video Playlists" />
        <meta
          name="twitter:description"
          content="Watch Solana conferences, live streams and stay up to date with the latest Podcasts"
        />
        <meta
          name="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1 relative z-0 overflow-hidden focus:outline-none">
        <div className="flex justify-center mb-8">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-stone-200 capitalize w-max">
            Playlists
          </h2>
        </div>

        {/* Playlists */}
        <Playlists data={playlists} />
      </main>
    </div>
  );
}
