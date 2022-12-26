import dynamic from 'next/dynamic';
import { Container } from '../../components/layout';
import fetch from '../../utils/fetcher';

const Sidebar = dynamic(() => import('../../components/sidebar'));
const Tabs = dynamic(() => import('../../components/dashboard/tabs'));

export async function getStaticProps() {
  const newContent = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/New`);
  const tweets = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pinned`);

  const latestNewsletter = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/newsletters`
  );

  return {
    props: { newContent, tweets, latestNewsletter: latestNewsletter[1] },
    revalidate: 60
  };
}

export default function Library({ newContent, tweets, latestNewsletter }) {
  const metaTags = {
    title: 'SolDev - Library',
    description:
      "Learn to Develop using Solana. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations",
    url: 'https://soldev.app/library',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center gap-6 px-2 md:pl-0">
        <main className="max-w-2xl">
          <Tabs newContent={newContent} />
        </main>

        <aside className="hidden max-w-sm xl:block">
          <Sidebar tweets={tweets} latestNewsletter={latestNewsletter} />
        </aside>
      </div>
    </Container>
  );
}
