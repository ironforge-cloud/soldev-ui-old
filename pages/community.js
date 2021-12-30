import Head from "next/head";
import useTweets from "../hooks/useTweets";
import Tweet from "../components/twitter/tweet";
import { useState } from "react";

export default function Community() {
  const { data: projectsTweets = [], projectsTweetsLoading } = useTweets(
    "1476564921030782979"
  );
  const { data: developersTweets = [], developersTweetsLoading } = useTweets(
    "1452853465210933252"
  );
  const { data: capitalTweets = [], capitalTweetsLeading } = useTweets(
    "1476564968665497607"
  );
  const [loadMore, setLoadMore] = useState(false);

  // This helper function allow me to have infinity loading without having
  // to build pagination in the api
  function loadTweets(tweets) {
    let size = 0;
    // If there are enough tweets we load 10, if not we load array.length
    if (Array.isArray(tweets) && tweets.length > 0) {
      tweets.length >= 10 ? (size = 10) : (size = tweets.length);
    }

    // if loadMore then we want to render all the tweets
    if (loadMore) size = tweets.length;

    let component = [];
    for (let i = 0; i < size; i++) {
      component.push(
        <div className="bg-white dark:bg-stone-800 px-6 mb-10 shadow-lg rounded-xl w-96 hover:bg-sky-50 dark:hover:bg-stone-700">
          <Tweet
            key={tweets[i].id}
            text={tweets[i].text}
            author={tweets[i].Author}
            id={tweets[i].id}
            media={tweets[i].Media}
            created_at={tweets[i].created_at}
            public_metrics={tweets[i].public_metrics}
            referenced_tweets={tweets[i].ReferencedTweets}
            pinned={tweets[i].Pinned}
          />
        </div>
      );
    }

    return <div className="">{component}</div>;
  }

  return (
    <div className="px-6">
      <Head>
        <title>SolDev: Community</title>
        <meta name="description" content="SolDev: Submit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex 3xl:gap-20 xl:gap-10 lg:gap-2 justify-center">
        {/* Developers Timeline*/}
        <div className="max-h-fit">
          <div className="flex justify-center">
            <h2
              id="trending-heading"
              className="text-lg font-medium text-gray-900 dark:text-stone-200"
            >
              Developers
            </h2>
          </div>
          <div className="mt-10 flow-root">
            <div role="list">
              {Array.isArray(developersTweets) && loadTweets(developersTweets)}
            </div>
          </div>
          {!loadMore && (
            <div className="mt-6">
              <button
                onClick={() => setLoadMore(true)}
                className="w-full block text-center px-4 py-2 border border-gray-300 dark:border-stone-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-stone-300 bg-white dark:bg-stone-700 hover:bg-gray-50 dark:hover:bg-stone-600"
              >
                View all
              </button>
            </div>
          )}
        </div>

        {/* Projects Timeline*/}
        <div className="max-h-fit">
          <div className="flex justify-center">
            <h2
              id="trending-heading"
              className="text-lg font-medium text-gray-900 dark:text-stone-200"
            >
              Ecosystem Projects
            </h2>
          </div>
          <div className="mt-10 flow-root">
            <div role="list">
              {Array.isArray(projectsTweets) && loadTweets(projectsTweets)}
            </div>
          </div>
          {!loadMore && (
            <div className="mt-6">
              <button
                onClick={() => setLoadMore(true)}
                className="w-full block text-center px-4 py-2 border border-gray-300 dark:border-stone-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-stone-300 bg-white dark:bg-stone-700 hover:bg-gray-50 dark:hover:bg-stone-600"
              >
                View all
              </button>
            </div>
          )}
        </div>

        {/* Investors Timeline*/}
        <div className="max-h-fit">
          <div className="flex justify-center">
            <h2
              id="trending-heading"
              className="text-lg font-medium text-gray-900 dark:text-stone-200"
            >
              Solana Capital
            </h2>
          </div>
          <div className="mt-10 flow-root">
            <div role="list">
              {Array.isArray(capitalTweets) && loadTweets(capitalTweets)}
            </div>
          </div>
          {!loadMore && (
            <div className="mt-6">
              <button
                onClick={() => setLoadMore(true)}
                className="w-full block text-center px-4 py-2 border border-gray-300 dark:border-stone-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-stone-300 bg-white dark:bg-stone-700 hover:bg-gray-50 dark:hover:bg-stone-600"
              >
                View all
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
