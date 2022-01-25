import React, { useState } from "react";
import PropTypes from "prop-types";
import loadContent from "../../utils/load-content";

const tabs = ["New", "Trending", "Releases"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ newContent, trendingContent }) {
  const [selectedTab, setSelectedTab] = useState("New");
  const [contentAmount, setContentAmount] = useState(10);

  function loadMoreContent(content, contentAmount, setContentAmount) {
    if (Array.isArray(content) && content.length > 0) {
      return (
        <div className="flex flex-col gap-5 pb-5">
          {loadContent(content, contentAmount)}

          {contentAmount < content.length && (
            <button
              onClick={() => setContentAmount((contentAmount += 5))}
              className="w-full block text-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 hover:bg-opacity-80 hover:opacity-95 bg-white dark:bg-gray-800"
            >
              View More
            </button>
          )}
        </div>
      );
    }
  }

  return (
    <>
      <div className="px-4 sm:px-0">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 dark:divide-gray-700"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <button
              key={tabIdx}
              aria-current={selectedTab === tab ? "page" : undefined}
              onClick={() => {
                setContentAmount(10);
                setSelectedTab(tab);
              }}
              className={classNames(
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-200 py-4 px-6 text-sm font-medium text-center  focus:z-10",
                tab !== "Releases" && "hover:bg-gray-50 dark:hover:bg-gray-700",
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
        <div className="flex flex-col justify-between gap-5">
          {selectedTab === "New" &&
            loadMoreContent(newContent, contentAmount, setContentAmount)}
          {selectedTab === "Trending" &&
            loadMoreContent(trendingContent, contentAmount, setContentAmount)}
        </div>
      </div>
    </>
  );
}

Tabs.propTypes = {
  newContent: PropTypes.array.isRequired,
  trendingContent: PropTypes.array.isRequired,
};
