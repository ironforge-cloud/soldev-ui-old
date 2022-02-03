import React, { memo, useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";

const Tweet = dynamic(() => import("../twitter/tweet"));
const Hackathon = dynamic(() => import("./hackathon"));

function Sidebar({ tweets }) {
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
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Hackathon />
      </div>

      {/* Announcements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between">
            <h2
              id="trending-heading"
              className="text-base font-medium text-gray-900 dark:text-gray-200"
            >
              Announcements
            </h2>
          </div>
          <div className="mt-6 flow-root">
            <div
              role="list"
              className="-my-4 divide-y divide-gray-200 dark:divide-gray-600"
            >
              {Array.isArray(tweets) && loadTweets(tweets)}
            </div>
          </div>
          {!loadMore && (
            <div className="mt-6">
              <button
                onClick={() => setLoadMore(true)}
                className="w-full block text-center px-4 py-2 border border-gray-300 dark:border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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

Sidebar.propTypes = {
  tweets: PropTypes.array.isRequired,
};

export default memo(Sidebar);
