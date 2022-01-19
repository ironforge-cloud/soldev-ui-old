import dynamic from "next/dynamic";
import fetch from "../../utils/fetcher";
import Tabs from "../../components/dashboard/tabs";
import { Container } from "../../components/layout";

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

const metaTags = {
  title: "SolDev - Library",
  description: "",
  url: "https://soldev.app/library",
  image: "https://soldev.app/solanaLogoMark.png",
};

export default function Library({ newContent, trendingContent, tweets }) {
  return (
    <Container metaTags={metaTags}>
      <div className="flex gap-6 px-2 md:pl-0 justify-center">
        <main className="max-w-2xl">
          <Tabs newContent={newContent} trendingContent={trendingContent} />
        </main>

        <aside className="hidden xl:block max-w-sm">
          <Sidebar tweets={tweets} />
        </aside>
      </div>
    </Container>
  );
}
