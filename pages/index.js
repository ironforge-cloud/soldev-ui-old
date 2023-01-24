import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Container } from '../components/layout';
import fetch from '../utils/fetcher';
import Banner from '../components/banner';

const Sidebar = dynamic(() => import('../components/sidebar'));
const CardHome = dynamic(() => import('../components/card/card-home'));

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
        title: 'Solana Bootcamp',
        url: 'https://soldev.app/library/PLilwLeBwGuK7Z2dXft_pmLZ675fuPgkA0',
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
        url: 'https://soldev.app/changelog',
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

export async function getStaticProps() {
  const newContent = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/New`);

  const latestNewsletter = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/newsletters`
  );

  const latestChangelog = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/PLilwLeBwGuK5-Qri7Pg9zd-Vvhz9kX2-R`
  );

  return {
    props: {
      newContent,
      latestNewsletter: latestNewsletter[0],
      latestChangelog: latestChangelog[0]
    },
    revalidate: 60
  };
}

export default function Home({ latestNewsletter, latestChangelog }) {
  const metaTags = {
    title: 'SolDev',
    description:
      'Learn to Develop using Solana. Tutorials, SDK\'s, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations',
    url: 'https://soldev.app/',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center gap-6 px-2 md:pl-0">
        <main className="max-w-5xl">
          {/* Main Card */}
          <div
            className="flex h-80 flex-col justify-center rounded border-2 border-gray-400 bg-white shadow-lg
          shadow-sky-500/30 dark:border-gray-600 dark:bg-gray-800 dark:shadow-sky-400/20"
          >
            <div className="px-6 text-center text-gray-900 dark:text-gray-100 md:px-10 ">
              <div className="flex flex-col items-center">
                <Link href="/course">
                  <h2 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
                    Introduction to Solana
                  </h2>
                </Link>
                <Banner/>
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
              <p
                className="absolute bottom-0 right-0 mb-4 mr-4 cursor-pointer text-sky-600
              decoration-rose-500 hover:underline dark:text-sky-500"
              >
                <>Start learning &rarr;</>
              </p>
            </Link>
          </div>

          <div className="mx-auto ml-2 mt-12 lg:max-w-none">
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
          <Sidebar latestChangelog={latestChangelog} latestNewsletter={latestNewsletter} />
        </aside>
      </div>
    </Container>
  );
}
