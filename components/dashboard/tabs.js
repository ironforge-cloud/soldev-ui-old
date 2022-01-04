import React, { useState } from "react";
import useBadge from "../../hooks/useBadge";
import Card from "../publications/card";
import Spinner from "../spinner";
import usePinnedTweets from "../../hooks/usePinnedTweets";
import Tweet from "../twitter/tweet";
import useTweets from "../../hooks/useTweets";
import loadTweets from "../../utils/loadTweets";

const tabs = ["New Content", "Developers", "Projects", "Releases"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState("New Content");
  const { isLoading, data } = useBadge(selectedTab);
  const { data: projectsTweets = [], projectsTweetsLoading } = useTweets(
    "1476564921030782979"
  );
  const { data: developersTweets = [], developersTweetsLoading } = useTweets(
    "1452853465210933252"
  );
  const [loadMoreDevelopers, setLoadMoreDevelopers] = useState(false);
  const [loadMoreProjects, setLoadMoreProjects] = useState(10);

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
              onClick={() => {
                setSelectedTab(tab);

                // state reset to remove memory usage
                // TODO: this could be improved with better pagination support.
                setLoadMoreProjects(false);
                setLoadMoreDevelopers(false);
              }}
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
          {isLoading && (
            <div className="mx-auto">
              <Spinner />
            </div>
          )}
          {/*  New Content Tab */}
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
          {/*  Developers Tab */}
          {selectedTab === "Developers" && (
            <div className="flex flex-col gap-5">
              {Array.isArray(developersTweets) &&
                loadTweets(developersTweets, loadMoreDevelopers)}
              {!loadMoreDevelopers && (
                <div className="">
                  <button
                    onClick={() => setLoadMoreDevelopers(true)}
                    className="w-full block text-center px-4 py-2 border border-gray-300 dark:border-stone-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-stone-300 bg-white dark:bg-stone-700 hover:bg-gray-50 dark:hover:bg-stone-600"
                  >
                    View all
                  </button>
                </div>
              )}
            </div>
          )}
          {/*  Projects Tab */}
          {selectedTab === "Projects" && (
            <div className="flex flex-col gap-5">
              {Array.isArray(projectsTweets) &&
                loadTweets(projectsTweets, loadMoreProjects)}
              {/*{!loadMoreProjects && (*/}
              <div className="">
                <button
                  onClick={() => setLoadMoreProjects(true)}
                  className="w-full block text-center px-4 py-2 border border-gray-300 dark:border-stone-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-stone-300 bg-white dark:bg-stone-700 hover:bg-gray-50 dark:hover:bg-stone-600"
                >
                  View all
                </button>
              </div>
              {/*)}*/}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
