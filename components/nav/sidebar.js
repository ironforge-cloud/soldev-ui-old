import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";
import useUser from "../../hooks/useUser";

const others = [
  { name: "Submit", href: "/submit", disabled: false },
  { name: "Newsletter", href: "/newsletter", disabled: false },
  { name: "Blog", href: "/#", disabled: true },
  { name: "FAQ", href: "/#", disabled: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar({
  secondaryNavigationData,
  section,
  secondaryNavigation,
  setSecondaryNavigation,
}) {
  const { user, isAdmin = false, connected, error } = useUser();

  return (
    <div className="hidden lg:block w-auto mr-4 h-screen">
      <nav
        aria-label="Sidebar"
        className="sticky top-4 divide-y divide-gray-300"
      >
        <div className="pb-8 space-y-1">
          {secondaryNavigationData[section].map((item) => {
            if (!isAdmin && item.name === "Submitted") return;
            return (
              <Link href={item.href} key={item.name} passHref>
                <a
                  className={classNames(
                    item.name === secondaryNavigation
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600",
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    item.disabled
                      ? "disabled:opacity-50 cursor-not-allowed text-gray-300"
                      : "hover:bg-gray-50"
                  )}
                  onClick={() => setSecondaryNavigation(item.name)}
                >
                  <item.icon
                    className={classNames(
                      item.current ? "text-gray-500" : "text-gray-400",
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6",
                      item.disabled
                        ? "disabled:opacity-50 cursor-not-allowed text-gray-300"
                        : ""
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              </Link>
            );
          })}
        </div>
        <div className="pt-10">
          <p
            className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            id="communities-headline"
          >
            Others
          </p>
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            {others.map((other) => (
              <Link href={other.href} key={other.name} passHref>
                <a
                  className={classNames(
                    "group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md ",
                    other.disabled
                      ? "disabled:opacity-50 cursor-not-allowed text-gray-300"
                      : "hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <span className="truncate">{other.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

Sidebar.prototype = {
  section: PropTypes.oneOf(["library", "social"]).isRequired,
  secondaryNavigationData: PropTypes.object.isRequired,
  secondaryNavigation: PropTypes.string.isRequired,
  setSecondaryNavigation: PropTypes.func.isRequired,
};

export default React.memo(Sidebar);
