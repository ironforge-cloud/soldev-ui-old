import useTweets from "../hooks/useTweets";
import { useState } from "react";
import loadTweets from "../utils/loadTweets";
import dynamic from "next/dynamic";
import fetch from "../utils/fetcher";
import { Container } from "../components/layout";

const Sidebar = dynamic(() => import("../components/sidebar"));
const Spinner = dynamic(() => import("../components/spinner"));

const tabs = ["developers", "projects"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export async function getStaticProps() {
  const tweets = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pinned`
  );

  return {
    props: { tweets },
    revalidate: 60,
  };
}

export default function Community({ tweets }) {
  const [selectedTab, setSelectedTab] = useState("developers");
  const { data: developersTweets = [], isLoading: developersTweetsLoading } =
    useTweets("1452853465210933252");
  const { data: projectsTweets = [], isLoading: projectsTweetsLoading } =
    useTweets("1476564921030782979");
  const [developersTweetsAmount, setDevelopersTweetsAmount] = useState(10);
  const [projectsTweetsAmount, setProjectsTweetsAmount] = useState(10);

  const metaTags = {
    title: "SolDev - Community",
    description:
      "Stay up-to-date with the Solana ecosystem. Solana Projects and Developers in one place.",
    url: "https://soldev.app/community",
    shouldIndex: true,
  };

  function loadMoreTweets(isLoading, tweets, tweetsAmount, setTweetsAmount) {
    if (isLoading) {
      return (
        <div className="mx-auto">
          <Spinner />
        </div>
      );
    } else {
      if (Array.isArray(tweets) && tweets.length > 0) {
        return (
          <div className="flex flex-col gap-5 pb-5">
            {loadTweets(tweets, tweetsAmount)}

            <button
              onClick={() => setTweetsAmount((tweetsAmount += 10))}
              className="w-full block text-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 hover:bg-opacity-80 hover:opacity-95 bg-white dark:bg-gray-800"
            >
              View more
            </button>
          </div>
        );
      }
    }
  }

  return (
    <Container metaTags={metaTags}>
      <div className="flex gap-6 px-2 md:pl-0 justify-center">
        <main className="w-[700px]">
          <div className="px-4 sm:px-0">
            <nav
              className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200 dark:divide-stone-700"
              aria-label="Tabs"
            >
              {tabs.map((tab, tabIdx) => (
                <button
                  key={tabIdx}
                  onClick={() => {
                    setSelectedTab(tab);
                    setDevelopersTweetsAmount(15);
                    setProjectsTweetsAmount(15);
                  }}
                  className={classNames(
                    tabIdx === 0 ? "rounded-l-lg" : "",
                    tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                    "group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-800 dark:text-gray-200 py-4 px-6 text-sm font-medium text-center  focus:z-10",
                    tab !== "Releases" &&
                      "hover:bg-gray-50 dark:hover:bg-gray-700",
                    tab === "Releases" && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <span className="capitalize">{tab}</span>

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
              {/*  Developers Tab */}
              {selectedTab === "developers" &&
                loadMoreTweets(
                  developersTweetsLoading,
                  developersTweets,
                  developersTweetsAmount,
                  setDevelopersTweetsAmount
                )}

              {/*  Projects Tab */}
              {selectedTab === "projects" &&
                loadMoreTweets(
                  projectsTweetsLoading,
                  projectsTweets,
                  projectsTweetsAmount,
                  setProjectsTweetsAmount
                )}
            </div>
          </div>
        </main>

        <aside className="hidden xl:block max-w-sm">
          <Sidebar tweets={tweets} />
        </aside>
      </div>
    </Container>
  );
}
