import useTweets from "../../hooks/useTweets";
import Tweet from "../twitter/tweet";
import React, { memo } from "react";
import NetworkStatus from "./network-status";

import usePinnedTweets from "../../hooks/usePinnedTweets";

function Sidebar() {
  const { data: tweets = [], isLoading } = useTweets();
  const { data: pinnedTweets = [], isLoading: pinnedTweetsLoading } =
    usePinnedTweets();

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
                {pinnedTweets.map((tweet) => (
                  <Tweet
                    key={tweet.id}
                    text={tweet.text}
                    author={tweet.Author}
                    id={tweet.id}
                    media={tweet.Media}
                    created_at={tweet.created_at}
                    public_metrics={tweet.public_metrics}
                    referenced_tweets={tweet.ReferenceTweets}
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
              {tweets.map((tweet) => (
                <Tweet
                  key={tweet.id}
                  text={tweet.text}
                  author={tweet.Author}
                  id={tweet.id}
                  media={tweet.Media}
                  created_at={tweet.created_at}
                  public_metrics={tweet.public_metrics}
                  referenced_tweets={tweet.ReferenceTweets}
                />
              ))}
            </div>
          </div>
          <div className="mt-6">
            <a
              href="#"
              className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              View all
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
