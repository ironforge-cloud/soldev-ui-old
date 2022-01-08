import Head from "next/head";
import useTweets from "../hooks/useTweets";
import { useState } from "react";
import Spinner from "../components/spinner";
import Sidebar from "../components/dashboard/sidebar";
import loadTweets from "../utils/loadTweets";

const tabs = ["developers", "projects"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Community() {
  const [selectedTab, setSelectedTab] = useState("developers");
  const { data: projectsTweets = [], isLoading: projectsTweetsLoading } =
    useTweets("projects");
  const { data: developersTweets = [], isLoading: developersTweetsLoading } =
    useTweets("developers");
  const [developersTweetsAmount, setDevelopersTweetsAmount] = useState(15);
  const [projectsTweetsAmount, setProjectsTweetsAmount] = useState(15);

  function loadDevelopersTweets(
    isLoading,
    tweets,
    tweetsAmount,
    setTweetsAmount
  ) {
    if (isLoading) {
      return (
        <div className="mx-auto">
          <Spinner />
        </div>
      );
    } else {
      if (Array.isArray(tweets) && tweets.length > 0) {
        return (
          <div className="flex flex-col gap-5">
            {loadTweets(tweets, tweetsAmount)}

            <div className="">
              <button
                onClick={() => setTweetsAmount((tweetsAmount += 10))}
                className="w-full block text-center px-4 py-2 border border-gray-300 dark:border-stone-700 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-stone-300 bg-white dark:bg-stone-700 hover:bg-gray-50 dark:hover:bg-stone-600"
              >
                View all
              </button>
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div>
      <Head>
        <title>SolDev - Community</title>

        <meta name="title" content="SolDev - Community" />
        <meta
          name="description"
          content="Stay up-to-date with the Solana ecosystem. Solana Projects and Developers in one place."
        />

        {/* Google */}
        <meta name="robots" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.soldev.app/community" />
        <meta property="og:title" content="SolDev - Community" />
        <meta
          property="og:description"
          content="Stay up-to-date with the Twitter Solana ecosystem. Solana Projects and Developers in one place."
        />
        <meta
          property="og:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta name="twitter:url" content="https://www.soldev.app/community" />
        <meta name="twitter:title" content="SolDev - Community" />
        <meta
          name="twitter:description"
          content="Stay up-to-date with the Twitter Solana ecosystem. Solana Projects and Developers in one place."
        />
        <meta
          name="twitter:image"
          content="https://www.soldev.app/solanaLogoMark.png"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

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
                    "group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-stone-800 dark:text-stone-200 py-4 px-6 text-sm font-medium text-center  focus:z-10",
                    tab !== "Releases" &&
                      "hover:bg-gray-50 dark:hover:bg-stone-700",
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
                loadDevelopersTweets(
                  developersTweetsLoading,
                  developersTweets,
                  developersTweetsAmount,
                  setDevelopersTweetsAmount
                )}

              {/*  Projects Tab */}
              {selectedTab === "projects" &&
                loadDevelopersTweets(
                  projectsTweetsLoading,
                  projectsTweets,
                  projectsTweetsAmount,
                  setProjectsTweetsAmount
                )}
            </div>
          </div>
        </main>
        <aside className="hidden xl:block">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
