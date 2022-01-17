import Head from "next/head";
import dynamic from "next/dynamic";
import fetch from "../../utils/fetcher";
import Tabs from "../../components/dashboard/tabs";

const Sidebar = dynamic(() => import("../../components/sidebar"));

export async function getStaticProps() {
  const newContent = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/New`
  );
  const trendingContent = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/Hot`
  );
  const tweets = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pinned`
  );

  return {
    props: { newContent, trendingContent, tweets },
    revalidate: 60,
  };
}

export default function Library({ newContent, trendingContent, tweets }) {
  return (
    <div>
      <Head>
        <title>SolDev - Library</title>
        <meta name="title" content="SolDev - Library" />
        <meta
          name="description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />

        {/* Google */}
        <meta name="robots" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.soldev.app/library" />
        <meta property="og:title" content="SolDev - Library" />
        <meta
          property="og:description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta name="twitter:url" content="https://www.soldev.app/library" />
        <meta name="twitter:title" content="SolDev - Library" />
        <meta
          name="twitter:description"
          content="Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations"
        />
        <meta
          name="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex gap-6 px-2 md:pl-0 justify-center">
        <main className="max-w-2xl">
          <Tabs newContent={newContent} trendingContent={trendingContent} />
        </main>

        <aside className="hidden xl:block max-w-sm">
          <Sidebar tweets={tweets} />
        </aside>
      </div>
    </div>
  );
}
