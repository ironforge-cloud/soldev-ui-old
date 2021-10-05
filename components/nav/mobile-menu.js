import React from "react";
import PropTypes from "prop-types";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MobileMenu({
  navigation,
  section,
  setSection,
  secondaryNavigationData,
  secondaryNavigation,
  setSecondaryNavigation,
}) {
  return (
    <Disclosure.Panel className="lg:hidden">
      {/* Main Section - Navbar content */}
      <div className="pt-2 pb-3 space-y-1">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => setSection(item.name)}
            disabled={item.disabled}
            className={classNames(
              "w-full text-left",
              item.name === section
                ? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
              item.disabled
                ? "disabled:opacity-50 cursor-not-allowed"
                : "hover:border-gray-300"
            )}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Subsession - Sidebar content */}
      <div className="pt-4 pb-3 border-t border-gray-200">
        {secondaryNavigationData[section].map((item) => (
          <Link href={item.href} key={item.name} passHref>
            <a
              className={classNames(
                "w-full text-left",
                item.name === secondaryNavigation
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                item.disabled
                  ? "disabled:opacity-50 cursor-not-allowed"
                  : "hover:border-gray-300"
              )}
              onClick={() => setSecondaryNavigation(item.name)}
            >
              {item.name}
            </a>
          </Link>
        ))}
      </div>

      {/* Profile Section */}
      {/* <div className="pt-4 pb-3 border-t border-gray-200">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">Tom Cook</div>
            <div className="text-sm font-medium text-gray-500">
              tom@example.com
            </div>
          </div>
          <button
            type="button"
            className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 space-y-1">
          <a
            href="#"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Your Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
          >
            Sign out
          </a>
        </div>
      </div> */}
    </Disclosure.Panel>
  );
}

MobileMenu.propTypes = {
  navigation: PropTypes.array.isRequired,
  section: PropTypes.string.isRequired,
  setSection: PropTypes.func.isRequired,
  secondaryNavigationData: PropTypes.object.isRequired,
  secondaryNavigation: PropTypes.string.isRequired,
  setSecondaryNavigation: PropTypes.func.isRequired,
};

export default React.memo(MobileMenu);
