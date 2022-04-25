import useTweets from '../hooks/useTweets';
import { useState } from 'react';
import loadTweets from '../utils/loadTweets';
import dynamic from 'next/dynamic';
import fetch from '../utils/fetcher';
import { Container } from '../components/layout';

const Sidebar = dynamic(() => import('../components/sidebar'));
const Spinner = dynamic(() => import('../components/spinner'));

const tabs = ['developers', 'projects'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export async function getStaticProps() {
  const tweets = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pinned`);
  const latestNewsletter = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/newsletters`
  );

  return {
    props: { tweets, latestNewsletter: latestNewsletter[0] },
    revalidate: 60
  };
}

export default function Community({ tweets, latestNewsletter }) {
  const [selectedTab, setSelectedTab] = useState('developers');
  const { data: developersTweets = [], isLoading: developersTweetsLoading } =
    useTweets('1452853465210933252');
  const { data: projectsTweets = [], isLoading: projectsTweetsLoading } =
    useTweets('1476564921030782979');
  const [developersTweetsAmount, setDevelopersTweetsAmount] = useState(10);
  const [projectsTweetsAmount, setProjectsTweetsAmount] = useState(10);

  const metaTags = {
    title: 'SolDev - Community',
    description:
      'Stay up-to-date with the Solana ecosystem. Solana Projects and Developers in one place.',
    url: 'https://soldev.app/community',
    shouldIndex: true
  };

  function loadMoreTweets(isLoading, tweets, tweetsAmount, setTweetsAmount) {
    if (isLoading) {
      return (
        <div className="mx-auto">
          <Spinner />
        </div>
      );
    } else {
      if (Array.isArray(tweets) && tweets.length > 0) {
        return (
          <div className="flex flex-col gap-5 pb-5">
            {loadTweets(tweets, tweetsAmount)}

            <button
              onClick={() => setTweetsAmount((tweetsAmount += 10))}
              className="block w-full rounded-lg bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-lg hover:bg-opacity-80 hover:opacity-95 hover:shadow-sky-500/30 dark:bg-gray-800 dark:text-gray-300 dark:hover:shadow-sky-400/20"
            >
              View more
            </button>
          </div>
        );
      }
    }
  }

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center gap-6 px-2 md:pl-0">
        <main className="w-[700px]">
          <div className="px-4 sm:px-0">
            <nav
              className="relative z-0 flex divide-x divide-gray-200 rounded-lg shadow dark:divide-gray-700"
              aria-label="Tabs"
            >
              {tabs.map((tab, tabIdx) => (
                <button
                  key={tabIdx}
                  onClick={() => {
                    setSelectedTab(tab);
                    setDevelopersTweetsAmount(15);
                    setProjectsTweetsAmount(15);
                  }}
                  className={classNames(
                    tabIdx === 0 ? 'rounded-l-lg' : '',
                    tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                    'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium focus:z-10 dark:bg-gray-800  dark:text-gray-200',
                    tab !== 'Releases' && 'hover:bg-gray-50 dark:hover:bg-gray-700',
                    tab === 'Releases' && 'cursor-not-allowed opacity-40'
                  )}
                >
                  <span className="capitalize">{tab}</span>

                  <span
                    aria-hidden="true"
                    className={classNames(
                      tab === selectedTab ? 'bg-rose-500' : 'bg-transparent',
                      'absolute inset-x-0 bottom-0 h-0.5'
                    )}
                  />
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-5">
            <div className="flex flex-col justify-between gap-5">
              {/*  Developers Tab */}
              {selectedTab === 'developers' &&
                loadMoreTweets(
                  developersTweetsLoading,
                  developersTweets,
                  developersTweetsAmount,
                  setDevelopersTweetsAmount
                )}

              {/*  Projects Tab */}
              {selectedTab === 'projects' &&
                loadMoreTweets(
                  projectsTweetsLoading,
                  projectsTweets,
                  projectsTweetsAmount,
                  setProjectsTweetsAmount
                )}
            </div>
          </div>
        </main>

        <aside className="hidden max-w-sm xl:block">
          <Sidebar tweets={tweets} latestNewsletter={latestNewsletter} />
        </aside>
      </div>
    </Container>
  );
}
