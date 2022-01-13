import Link from "next/link";
import {
  ChatAlt2Icon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
  LibraryIcon,
  PaperClipIcon,
  SparklesIcon,
} from "@heroicons/react/outline";
import useUser from "../../hooks/useUser";
import { memo, useState } from "react";
import PropTypes from "prop-types";

const navigation = [
  {
    name: "Library",
    href: "/library",
    icon: LibraryIcon,
    disabled: false,
  },
  {
    name: "Community",
    href: "/community",
    icon: ChatAlt2Icon,
    disabled: false,
  },
  {
    name: "Jobs",
    href: "https://jobs.solana.com?utm_source=soldev.app",
    icon: ClipboardCheckIcon,
    disabled: false,
  },
];

const special = [
  {
    name: "Solana Cookbook",
    href: "https://solanacookbook.com/?utm_source=soldev.app",
    disabled: false,
  },
  {
    name: "Anchor Book",
    href: "https://book.anchor-lang.com/?utm_source=soldev.app",
    disabled: false,
  },
  {
    name: "Solana Docs",
    href: "https://docs.solana.com/introduction?utm_source=soldev.app",
    disabled: false,
  },
  {
    name: "Metaplex Docs",
    href: "https://docs.metaplex.com?utm_source=soldev.app",
    disabled: false,
  },
];

const specialLists = [
  { name: "Getting Started", href: "/library/list/started" },
];

const series = [
  {
    name: "Figment",
    href: "https://learn.figment.io/protocols/solana",
  },
  {
    name: "Questbook",
    href: "https://www.startonsolana.com",
  },
];

const categories = [
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

function NavSidebar({ closeMobileMenu }) {
  const [current, setCurrent] = useState("Library");
  const { user, isAdmin = false, connected, error } = useUser();

  return (
    <nav
      aria-label="Sidebar"
      className="top-4 divide-y divide-gray-300 dark:divide-stone-500"
    >
      <div className="pb-5 space-y-1">
        {navigation.map((item) => {
          if (item.name === "Jobs") {
            return (
              <a
                href={item.href}
                rel="noreferrer"
                key={item.name}
                onClick={() => closeMobileMenu()}
                className={classNames(
                  item.name === current
                    ? "bg-gray-200 text-gray-900 dark:bg-stone-800 dark:text-stone-200"
                    : "text-gray-600 dark:text-stone-200",
                  "min-w-full group flex items-center px-3 py-2 text-lg lg:text-sm font-medium rounded-md max-w-[190px] cursor-pointer",
                  item.disabled
                    ? "opacity-50"
                    : "hover:bg-gray-50 dark:hover:bg-stone-700"
                )}
                target="_blank"
              >
                <item.icon
                  className={classNames(
                    item.name === current ? "text-gray-500" : "text-gray-400 ",
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
                    : "text-gray-800 dark:text-stone-300",
                  "min-w-full hover:bg-gray-50 dark:hover:bg-stone-700 group flex items-center px-3 py-2 text-lg lg:text-sm font-medium rounded-md max-w-[190px]"
                )}
                onClick={() => {
                  setCurrent(item.name);
                  closeMobileMenu();
                }}
                aria-current={item.current ? "page" : undefined}
                disabled={item.disabled}
              >
                <item.icon
                  className={classNames(
                    item.name === current ? "text-gray-500" : "text-gray-400 ",
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

      <div className="pt-5 space-y-5">
        {/* Special */}
        <div>
          <p
            className="px-3 text-md lg:text-xs font-semibold text-gray-500 uppercase tracking-wider"
            id="communities-headline"
          >
            Reference
          </p>
          <div
            className="mt-3 space-y-1"
            aria-labelledby="communities-headline"
          >
            {special.map((item) => {
              return (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => closeMobileMenu()}
                >
                  <div className="group gap-1 flex cursor-pointer items-center px-3 py-2 text-lg lg:text-sm font-medium text-gray-600 dark:text-stone-300 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-stone-700 dark:hover:text-stone-300">
                    <ExternalLinkIcon
                      className="h-4 w-4 text-rose-400 dark:text-rose-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6">{item.name}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Lists */}
        <div>
          <p
            className="px-3 text-md lg:text-xs font-semibold text-gray-500 uppercase tracking-wider"
            id="communities-headline"
          >
            Lists
          </p>
          <div
            className="mt-3 space-y-1"
            aria-labelledby="communities-headline"
          >
            {specialLists.map((item) => {
              return (
                <Link href={item.href} passHref key={item.name}>
                  <button
                    onClick={() => closeMobileMenu()}
                    className="min-w-full group gap-1 flex cursor-pointer items-center px-3 py-2 text-lg lg:text-sm font-medium text-gray-600 dark:text-stone-300 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-stone-700 dark:hover:text-stone-300"
                  >
                    <SparklesIcon
                      className="h-4 w-4 text-rose-400 dark:text-rose-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6">{item.name}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Series */}
        <div>
          <p
            className="px-3 text-md lg:text-xs font-semibold text-gray-500 uppercase tracking-wider"
            id="communities-headline"
          >
            Series
          </p>
          <div
            className="mt-3 space-y-1"
            aria-labelledby="communities-headline"
          >
            {series.map((item) => {
              return (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => closeMobileMenu()}
                >
                  <div className="group gap-1 flex cursor-pointer items-center px-3 py-2 text-lg lg:text-sm font-medium text-gray-600 dark:text-stone-300 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-stone-700 dark:hover:text-stone-300">
                    <ExternalLinkIcon
                      className="h-4 w-4 text-rose-400 dark:text-rose-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6">{item.name}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div>
          <p
            className="px-3 text-md lg:text-xs font-semibold text-gray-500 uppercase tracking-wider"
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
                  <button
                    onClick={() => closeMobileMenu()}
                    className="min-w-full group gap-1 flex cursor-pointer items-center px-3 py-2 text-lg lg:text-sm font-medium text-gray-600 dark:text-stone-300 rounded-md hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-stone-700 dark:hover:text-stone-300"
                  >
                    <PaperClipIcon
                      className="h-4 w-4 text-rose-400 dark:text-rose-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6">{item.name}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

NavSidebar.defaultProps = {
  closeMobileMenu: () => {},
};

NavSidebar.prototype = {
  closeMobileMenu: PropTypes.func,
};

export default memo(NavSidebar);
