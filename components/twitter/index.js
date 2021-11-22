import React from "react";
import PropTypes from "prop-types";
import TweetGm from "./gm";
import Tweet from "../twitter/tweet";
import useTweets from "../../hooks/useTweets";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MiniSocial({ size }) {
  const { data = [], isLoading } = useTweets();

  return (
    <aside
      className={classNames(
        "hidden w-96 bg-white rounded-lg shadow-lg border overflow-hidden",
        size === "xl" && " xl:block",
        size === "2xl" && "2xl:block"
      )}
    >
      <div className="mt-5">
        <div className="flex items-center justify-between pb-3 px-3">
          <h2 className="text-gray-500 pl-3 font-medium uppercase tracking-wide mb-3 text-sm">
            Twitter Timeline
          </h2>
          <TweetGm />
        </div>
        <div className="px-1">
          {data.map((tweet) => {
            return (
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
            );
          })}
        </div>
      </div>
    </aside>
  );
}

MiniSocial.defaultProps = {
  size: "xl",
};

MiniSocial.propTypes = {
  size: PropTypes.string,
};

export default React.memo(MiniSocial);
