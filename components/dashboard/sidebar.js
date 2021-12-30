import useTweets from "../../hooks/useTweets";
import Tweet from "../twitter/tweet";
import React, { memo, useState } from "react";
import NetworkStatus from "./network-status";
import usePinnedTweets from "../../hooks/usePinnedTweets";

function Sidebar() {
  const { data: tweets = [], tweetsLoading } = useTweets();
  const { data: pinnedTweets = [], isLoading: pinnedTweetsLoading } =
    usePinnedTweets();
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
      );
    }

    return component;
  }

  return (
    <div className="flex flex-warp flex flex-col gap-6">
      <div className="space-y-6 w-[420px]">
        {/* Network Status */}
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow max-h-fit ">
          <NetworkStatus />
        </div>

        {/* Pinned Tweets */}
        {Array.isArray(pinnedTweets) && pinnedTweets.length > 0 && (
          <div className="bg-white dark:bg-stone-800 rounded-lg shadow max-h-fit">
            <div className="p-6">
              <h2
                id="who-to-follow-heading"
                className="text-base font-medium text-gray-900 dark:text-stone-200"
              >
                Pinned Tweets
              </h2>

              <div className="mt-6 flow-root">
                <div
                  role="list"
                  className="-my-4 divide-y divide-gray-200 dark:divide-stone-500"
                >
                  {pinnedTweets.map((tweet) => (
                    <Tweet
                      key={tweet.id}
                      text={tweet.text}
                      author={tweet.Author}
                      id={tweet.id}
                      media={tweet.Media}
                      created_at={tweet.created_at}
                      public_metrics={tweet.public_metrics}
                      referenced_tweets={tweet.ReferencedTweets}
                      pinned={tweet.Pinned}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Twitter Timeline*/}
      <div className="bg-stone-50 dark:bg-stone-800 rounded-lg shadow w-[420px] max-h-fit ">
        <div className="p-6">
          <div className="flex justify-between">
            <h2
              id="trending-heading"
              className="text-base font-medium text-gray-900 dark:text-stone-200"
            >
              Twitter Timeline
            </h2>
            <a
              href="https://twitter.com/soldevapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-blue-500 dark:text-stone-500 text-sm">
                @soldevapp
              </span>
            </a>
          </div>
          <div className="mt-6 flow-root">
            <div
              role="list"
              className="-my-4 divide-y divide-gray-200 dark:divide-stone-600"
            >
              {Array.isArray(tweets) && loadTweets(tweets)}
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

export default memo(Sidebar);
