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
          referenced_tweets={tweets[i].ReferenceTweets}
        />
      );
    }

    return component;
  }

  return (
    <div className="flex flex-warp flex flex-col 3xl:flex-row gap-6 ">
      <div className="space-y-6 w-[420px]">
        {/* Network Status */}
        <div className="bg-white rounded-lg shadow max-h-fit ">
          <NetworkStatus />
        </div>

        {/* Pinned Tweets */}
        <div className="bg-white rounded-lg shadow  max-h-fit">
          <div className="p-6">
            <h2
              id="who-to-follow-heading"
              className="text-base font-medium text-gray-900"
            >
              Pinned Tweets
            </h2>

            <div className="mt-6 flow-root">
              <div role="list" className="-my-4 divide-y divide-gray-200">
                {Array.isArray(pinnedTweets) &&
                  pinnedTweets.map((tweet) => (
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
      </div>

      {/* Twitter Timeline*/}
      <div className="bg-white rounded-lg shadow w-[420px] max-h-fit">
        <div className="p-6">
          <h2
            id="trending-heading"
            className="text-base font-medium text-gray-900"
          >
            Twitter Timeline
          </h2>
          <div className="mt-6 flow-root">
            <div role="list" className="-my-4 divide-y divide-gray-200">
              {Array.isArray(tweets) && loadTweets(tweets)}
            </div>
          </div>
          {!loadMore && (
            <div className="mt-6">
              <button
                onClick={() => setLoadMore(true)}
                className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
