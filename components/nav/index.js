import {
  LibraryIcon,
  InboxInIcon,
  ClipboardCheckIcon,
  NewspaperIcon,
} from "@heroicons/react/outline";
import TopBar from "./topbar";
import useUser from "../../hooks/useUser";
import Link from "next/link";
import { memo } from "react";

const navigation = [
  {
    name: "Library",
    href: "/library/playlists",
    icon: LibraryIcon,
    current: true,
    disabled: false,
  },
  {
    name: "Newsletter",
    href: "#",
    icon: InboxInIcon,
    current: false,
    disabled: true,
  },
  {
    name: "Jobs",
    href: "https://jobs.solana.com/",
    icon: ClipboardCheckIcon,
    current: false,
    disabled: false,
  },
];

const categories = [
  { name: "Playlists", href: "/library/playlists" },
  { name: "Courses", href: "/library/courses" },
  { name: "Tutorials", href: "/library/tutorials" }, // blog posts
  { name: "Books", href: "/library/books" },
  { name: "SDKs & Frameworks", href: "/library/sdk" },
  { name: "Tools", href: "/library/tools" },
  { name: "Submitted", href: "/library/admin/submitted" },
  { name: "Inactive", href: "/library/admin/inactive" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Nav({ children }) {
  const { user, isAdmin = false, connected, error } = useUser();

  return (
    <div className="">
      <TopBar categories={categories} navigation={navigation} />

      <div className="min-h-full">
        <div className="flex sm:pl-6 lg:pl-8 lg:gap-8 py-10">
          <div className="max-w-[170px]  hidden lg:block">
            <nav
              aria-label="Sidebar"
              className="sticky top-4 divide-y divide-gray-300"
            >
              <div className="pb-8 space-y-1">
                {navigation.map((item) => {
                  if (item.name === "Jobs") {
                    return (
                      <a
                        href={item.href}
                        rel="noreferrer"
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-600",
                          "group flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[170px] min-w-[150px] cursor-pointer",
                          item.disabled ? "opacity-50 " : "hover:bg-gray-50"
                        )}
                        target="_blank"
                      >
                        <item.icon
                          className={classNames(
                            item.current ? "text-gray-500" : "text-gray-400 ",
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
                          item.current
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-600",
                          "group flex items-center px-3 py-2 text-sm font-medium rounded-md max-w-[170px] min-w-[150px]",
                          item.disabled ? "opacity-50 " : "hover:bg-gray-50"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        disabled={item.disabled}
                      >
                        <item.icon
                          className={classNames(
                            item.current ? "text-gray-500" : "text-gray-400 ",
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
              <div className="pt-10">
                <p
                  className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  id="communities-headline"
                >
                  Categories
                </p>
                <div
                  className="mt-3 space-y-2"
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
                        <a className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50">
                          <span className="truncate">{item.name}</span>
                        </a>
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
