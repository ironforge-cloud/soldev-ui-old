import React, { useState } from "react";
import useBadge from "../../hooks/useBadge";
import Card from "../publications/card";
import Spinner from "../spinner";
import usePinnedTweets from "../../hooks/usePinnedTweets";
import Tweet from "../twitter/tweet";

const tabs = ["New Content", "Community", "Releases"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState("New Content");
  const { data: pinnedTweets = [], isLoading: pinnedTweetsLoading } =
    usePinnedTweets();
  const { isLoading, data } = useBadge(selectedTab);

  return (
    <>
      <div className="px-4 sm:px-0">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 dark:divide-stone-700"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <button
              key={tabIdx}
              aria-current={selectedTab === tab ? "page" : undefined}
              onClick={() => setSelectedTab(tab)}
              className={classNames(
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-stone-800 dark:text-stone-200 py-4 px-6 text-sm font-medium text-center  focus:z-10",
                tab !== "Releases" &&
                  "hover:bg-gray-50 dark:hover:bg-stone-700",
                tab === "Releases" && "opacity-40 cursor-not-allowed"
              )}
              disabled={tab === "Releases" && true}
            >
              <span>{tab}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab === selectedTab ? "bg-rose-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-5">
        <h1 className="sr-only">Recent</h1>
        <div className="flex flex-col justify-between gap-5">
          {pinnedTweetsLoading && (
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
          {selectedTab === "New Content" &&
            Array.isArray(data) &&
            data.map((content) => {
              return (
                <Card
                  content={content}
                  key={content.SK}
                  editContent={() => {}}
                  mode="dashboard"
                />
              );
            })}
          {selectedTab === "Community" &&
            pinnedTweets.map((tweet) => (
              <div
                key={tweet.id}
                className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-6 shadow-lg rounded-lg"
              >
                <Tweet
                  text={tweet.text}
                  author={tweet.Author}
                  id={tweet.id}
                  media={tweet.Media}
                  created_at={tweet.created_at}
                  public_metrics={tweet.public_metrics}
                  referenced_tweets={tweet.ReferencedTweets}
                  pinned={tweet.Pinned}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
