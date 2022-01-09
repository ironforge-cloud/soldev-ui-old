import React, { useState } from "react";
import Card from "../publications/card";
import PropTypes from "prop-types";

const tabs = ["New", "Trending", "Releases"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ newContent, trendingContent }) {
  const [selectedTab, setSelectedTab] = useState("New");

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
        <div className="flex flex-col justify-between gap-5">
          {selectedTab === "New" &&
            newContent.map((content) => {
              return (
                <Card
                  content={content}
                  key={content.SK}
                  editContent={() => {}}
                  mode="dashboard"
                />
              );
            })}
          {selectedTab === "Trending" &&
            trendingContent.map((content) => {
              return (
                <Card
                  content={content}
                  key={content.SK}
                  editContent={() => {}}
                  mode="dashboard"
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

Tabs.propTypes = {
  newContent: PropTypes.array.isRequired,
  trendingContent: PropTypes.array.isRequired,
};
