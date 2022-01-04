import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Tabs from "../../components/dashboard/tabs";
import Sidebar from "../../components/dashboard/sidebar";

export async function getStaticProps(context) {
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
        <meta name="description" content="SolDev" />
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
