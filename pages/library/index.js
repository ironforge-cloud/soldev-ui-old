import Head from "next/head";
import fetch from "isomorphic-unfetch";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("../../components/dashboard/sidebar"));

const Tabs = dynamic(() => import("../../components/dashboard/tabs"));

export async function getStaticProps() {
  const newResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/New`
  );
  const trendingResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/Hot`
  );

  const newContent = await newResponse.json();
  const trendingContent = await trendingResponse.json();

  return {
    props: { newContent, trendingContent },
    revalidate: 60,
  };
}

export default function Library({ newContent, trendingContent }) {
  return (
    <div>
      <Head>
        <title>SolDev: Library</title>
        <meta name="title" content="SolDev: Library" />
        <meta name="og:title" content="SolDev: Library" />
        <meta
          name="description"
          content="Stay up to date with the Solana developer community."
        />
        <meta
          name="og:description"
          content="Stay up to date with the Solana developer community."
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="robot" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex gap-6 px-2 md:pl-0 justify-center">
        <main className="w-[700px]">
          <Tabs newContent={newContent} trendingContent={trendingContent} />
        </main>
        <aside className="hidden xl:block">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
