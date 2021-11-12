import React from "react";
import PropTypes from "prop-types";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import useUser from "../../hooks/useUser";

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
  closeMenu,
}) {
  const { isAdmin = false } = useUser();

  return (
    <Disclosure.Panel className="lg:hidden">
      {/* Main Section - Navbar content */}
      <div className="pt-2 pb-3 space-y-1">
        {navigation.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              closeMenu();
              setSection(item.name);
            }}
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
        {secondaryNavigationData[section].map((item) => {
          if (
            !isAdmin &&
            (item.name === "Submitted" || item.name === "Inactive")
          )
            return;

          return (
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
                onClick={() => {
                  closeMenu();
                  setSecondaryNavigation(item.name);
                }}
              >
                {item.name}
              </a>
            </Link>
          );
        })}
      </div>
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
  closeMenu: PropTypes.func.isRequired,
};

export default React.memo(MobileMenu);
