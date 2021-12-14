import { useState } from "react";
import useBadge from "../../hooks/useBadge";
import Card from "../publications/card";
import Spinner from "../spinner";

const tabs = ["New", "Trending", "Releases"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState("New");
  const { isLoading, data } = useBadge(selectedTab);

  return (
    <>
      <div className="px-4 sm:px-0">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
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
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
              )}
              disabled={tab !== "New" && true}
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
          {isLoading ? (
            <div className="mx-auto">
              <Spinner />
            </div>
          ) : (
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
            })
          )}
        </div>
      </div>
    </>
  );
}
