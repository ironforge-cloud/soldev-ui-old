import {
  LibraryIcon,
  InboxInIcon,
  ClipboardCheckIcon,
  HashtagIcon,
  DesktopComputerIcon,
  CubeIcon,
  BeakerIcon,
} from "@heroicons/react/outline";
import TopBar from "./topbar";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import { memo, useState } from "react";

const navigation = [
  {
    name: "Library",
    href: "/library",
    icon: LibraryIcon,
    disabled: false,
  },
  {
    name: "Network Monitor",
    href: "#",
    icon: DesktopComputerIcon,
    disabled: true,
  },
  {
    name: "Services",
    href: "#",
    icon: CubeIcon,
    disabled: true,
  },
  {
    name: "Newsletter",
    href: "#",
    icon: InboxInIcon,
    disabled: true,
  },
  {
    name: "Cookbook",
    href: "https://solanacookbook.com/",
    icon: BeakerIcon,
    disabled: false,
  },
  {
    name: "Jobs",
    href: "https://jobs.solana.com/",
    icon: ClipboardCheckIcon,
    disabled: false,
  },
];

const categories = [
  { name: "Series", href: "/library/series" },
  { name: "Tutorials", href: "/library/tutorials" },
  { name: "Articles", href: "/library/articles" },
  { name: "Projects", href: "/library/projects" },
  { name: "SDKs & Frameworks", href: "/library/sdk" },
  { name: "Scaffolds", href: "/library/scaffolds" },
  { name: "Tools", href: "/library/tools" },
  {
    name: "Implementations",
    href: "/library/implementations",
  },
  { name: "Security", href: "/library/security" },
  { name: "Program Library", href: "/library/spl" },
  { name: "Twitter Threads", href: "/library/threads" },
  { name: "Playlists", href: "/library/playlists" },
  { name: "Submitted", href: "/library/admin/submitted" },
  { name: "Inactive", href: "/library/admin/inactive" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Nav({ children }) {
  const [current, setCurrent] = useState("Library");
  const { user, isAdmin = false, connected, error } = useUser();

  return (
    <div className="">
      <TopBar categories={categories} navigation={navigation} />

      <div className="min-h-full">
        <div className="flex sm:pl-6 lg:pl-8 lg:gap-8 py-10">
          <div className="min-w-[190px] hidden lg:block  content-between">
            <nav
              aria-label="Sidebar"
              className="sticky top-4 divide-y divide-gray-300 dark:divide-stone-500"
            >
              <div className="pb-8 space-y-1">
                {navigation.map((item) => {
                  if (item.name === "Jobs" || item.name === "Cookbook") {
                    return (
                      <a
                        href={item.href}
                        rel="noreferrer"
                        key={item.name}
                        className={classNames(
                          item.name === current
                            ? "bg-gray-200 text-gray-900 dark:bg-stone-800 dark:text-stone-200"
                            : "text-gray-600 dark:text-stone-200",
                          "group flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[170px] min-w-[150px] cursor-pointer",
                          item.disabled
                            ? "opacity-50"
                            : "hover:bg-gray-50 dark:hover:bg-stone-700"
                        )}
                        target="_blank"
                      >
                        <item.icon
                          className={classNames(
                            item.name === current
                              ? "text-gray-500"
                              : "text-gray-400 ",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6",
                            !item.disabled && "group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </a>
                    );
                  }

                  return (
                    <Link href={item.href} passHref key={item.name}>
                      <button
                        className={classNames(
                          item.name === current
                            ? "bg-gray-200 text-gray-900 dark:bg-stone-800 dark:text-stone-200"
                            : "text-gray-600",
                          "group flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[170px] min-w-[150px]",
                          item.disabled
                            ? "opacity-50"
                            : "hover:bg-gray-50 dark:hover:bg-stone-700"
                        )}
                        onClick={() => setCurrent(item.name)}
                        aria-current={item.current ? "page" : undefined}
                        disabled={item.disabled}
                      >
                        <item.icon
                          className={classNames(
                            item.name === current
                              ? "text-gray-500"
                              : "text-gray-400 ",
                            "flex-shrink-0 -ml-1 mr-3 h-6 w-6",
                            !item.disabled && "group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
                        />
                        <span className="truncate">{item.name}</span>
                      </button>
                    </Link>
                  );
                })}
              </div>
              <div className="py-10">
                <p
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="communities-headline"
                >
                  Categories
                </p>
                <div
                  className="mt-3 space-y-1"
                  aria-labelledby="communities-headline"
                >
                  {categories.map((item) => {
                    if (
                      (item.name === "Submitted" || item.name === "Inactive") &&
                      !isAdmin
                    ) {
                      return;
                    }

                    return (
                      <Link href={item.href} passHref key={item.name}>
                        <div className="group gap-1 flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-stone-300 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-stone-700 dark:hover:text-stone-300">
                          <HashtagIcon
                            className="h-4 w-4 text-rose-400 dark:text-rose-500"
                            aria-hidden="true"
                          />
                          <span className="truncate leading-6">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
          <div className="w-full overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(Nav);
