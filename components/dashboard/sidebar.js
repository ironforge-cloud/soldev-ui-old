import React, { memo, useState } from "react";
import dynamic from "next/dynamic";
import usePinnedTweets from "../../hooks/usePinnedTweets";
import NetworkStatus from "./network-status";

const Tweet = dynamic(() => import("../twitter/tweet"));
const Spinner = dynamic(() => import("../spinner"));

function Sidebar() {
  const { data: tweets = [], isLoading } = usePinnedTweets();
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
      {/* Network Status */}
      <div className="bg-white dark:bg-stone-800 rounded-lg shadow max-h-fit">
        <NetworkStatus />
      </div>

      {/* Announcements */}
      <div className="bg-white dark:bg-stone-800 rounded-lg shadow w-[420px] max-h-fit ">
        <div className="p-6">
          <div className="flex justify-between">
            <h2
              id="trending-heading"
              className="text-base font-medium text-gray-900 dark:text-stone-200"
            >
              Announcements
            </h2>
          </div>
          <div className="mt-6 flow-root">
            <div
              role="list"
              className="-my-4 divide-y divide-gray-200 dark:divide-stone-600"
            >
              {isLoading ? (
                <div className="flex justify-center min-h-screen">
                  <Spinner />
                </div>
              ) : (
                Array.isArray(tweets) && loadTweets(tweets)
              )}
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
