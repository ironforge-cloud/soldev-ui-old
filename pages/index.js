import dynamic from 'next/dynamic';
import Link from 'next/link';
import Banner from '../components/course/banner';
import { Container } from '../components/layout';
import fetch from '../utils/fetcher';

const Sidebar = dynamic(() => import('../components/sidebar'));
const CardHome = dynamic(() => import('../components/card/card-home'));

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

const blocks = [
  {
    heading: 'Learn',
    item: [
      {
        title: 'Solana Cookbook',
        url: 'https://solanacookbook.com',
        tags: ['beginner', 'javascript'],
        author: 'Solana Foundation',
        description: 'A collection of recipes for building on Solana'
      },
      {
        title: 'buildspace\n Solana Core',
        url: 'https://buildspace.so/solana-core',
        tags: ['intermediate', 'anchor'],
        author: 'Buildspace',
        description: 'A 6-week course on building on Solana'
      },
      {
        title: 'Solana Bootmcap',
        url: '/library/PLilwLeBwGuK7Z2dXft_pmLZ675fuPgkA0',
        tags: ['advance', 'rust'],
        author: 'Solana Foundation',
        description: 'A bootcamp for building on Solana with Jarry Xiao'
      }
    ]
  },
  {
    heading: 'Stay up to date',
    item: [
      {
        title: 'Newsletter',
        url: '/newsletters',
        author: 'Solana Foundation',
        description: 'The latest news and updates from the Solana Foundation'
      },
      {
        title: 'Changelog',
        url: '/library/PLilwLeBwGuK5-Qri7Pg9zd-Vvhz9kX2-R',
        author: 'Solana Foundation',
        description: 'Weekly updates on the Solana ecosystem'
      },
      {
        title: 'Core Dev Call',
        url: 'https://www.youtube.com/@SolanaFndn',
        author: 'Solana Foundation',
        description: 'Solana protocol core contributors weekly call'
      }
    ]
  },
  {
    heading: 'Earn by Superteam',
    item: [
      {
        title: 'Jobs',
        url: 'https://earn.superteam.fun/opportunities/category/jobs',
        author: 'Supterteam',
        description: 'Find a job in the Solana ecosystem'
      },
      {
        title: 'Bounties',
        url: 'https://earn.superteam.fun/opportunities/category/bounties',
        author: 'Supterteam',
        description: 'Find a bounty in the Solana ecosystem'
      },
      {
        title: 'Grants',
        url: 'https://earn.superteam.fun/opportunities/category/grants',
        author: 'Supterteam',
        description: 'Find a grant in the Solana ecosystem'
      }
    ]
  }
];

export default function Home({ tweets, latestNewsletter }) {
  const metaTags = {
    title: 'SolDev - Home',
    description:
      'Learn to Develop using Solana. Tutorials, SDK\'s, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations',
    url: 'https://soldev.app/',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center gap-6 px-2 md:pl-0">
        <main className="max-w-4xl">
          {/* Main Card */}
          <div className="flex h-80 flex-col justify-center rounded-lg bg-white shadow-lg hover:shadow-sky-500/30 dark:bg-gray-800 dark:hover:shadow-sky-400/20">
            <div className="px-6 text-center text-gray-900 dark:text-gray-100 md:px-10 ">
              <div className="flex flex-col items-center">
                <Link href="/course">
                  <h2 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
                    Solana Development Course
                  </h2>
                </Link>
                <Banner />
              </div>

              <p className="mt-5 text-gray-600 dark:text-gray-200">
                This course is designed to be the absolute best starting point for Web Developers
                looking to learn Web3 Development. Solana is the ideal network for starting your
                Web3 journey because of its high speed, low cost, energy efficiency, and more.
              </p>
            </div>
          </div>
          <div className="relative">
            <Link href="/course">
              <p className="absolute bottom-0 right-0 mb-4 mr-4 cursor-pointer text-sky-600 decoration-rose-500 hover:underline">
                <>Start learning &rarr;</>
              </p>
            </Link>
          </div>

          <div className="mx-auto mt-12 lg:max-w-none">
            {blocks.map(card => (
              // Smaller cards
              <div key={card.heading}>
                <p className="mx-2 mt-10 mb-2 text-center text-xl font-bold text-gray-900 dark:text-gray-200 sm:text-left">
                  {card.heading}
                </p>
                <div className="grid gap-5 sm:grid-cols-3">
                  {card.item.map((item, index) => (
                    <CardHome
                      key={index}
                      title={item.title}
                      url={item.url}
                      tags={item.tags}
                      author={item.author}
                      description={item.description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="hidden max-w-sm 2xl:block">
          <Sidebar tweets={tweets} latestNewsletter={latestNewsletter} />
        </aside>
      </div>
    </Container>
  );
}
