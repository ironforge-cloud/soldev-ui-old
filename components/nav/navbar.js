import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import Link from "next/link";
import CategorySelector from "./category-selector";
import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const navigation = [
  {
    name: "Library",
    disabled: false,
    url: "/library",
  },
  {
    name: "Community",
    disabled: true,
    url: "/community",
  },
  {
    name: "Calendar",
    disabled: true,
    url: "#",
  },
  {
    name: "Jobs",
    disabled: false,
    url: "https://jobs.solana.com/",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({
  setSection,
  section,
  secondaryNavigationData,
  secondaryNavigation,
  setSecondaryNavigation,
}) {
  const router = useRouter();
  const { publicKey } = useWallet();

  if (publicKey) console.log(publicKey.toBase58());

  const { vertical = "Solana" } = router.query;

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto md:px-2">
            <div className="flex justify-between h-16">
              {/* Logo and Navigation */}
              <div className="flex">
                <div className="relative flex-shrink-0 flex items-center cursor-pointer lg:mr-4">
                  <Link href={`/library/${vertical}`} passHref>
                    <a>
                      <Image
                        src="/logowip-er2.svg"
                        alt="Logo"
                        width="175px"
                        height="150px"
                      />
                    </a>
                  </Link>
                </div>

                <div className="flex lg:ml-10 space-x-4 lg:space-x-8">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {navigation.map((item) => {
                    if (item.name === "Library") {
                      return (
                        <CategorySelector
                          item={item}
                          setSection={setSection}
                          section={section}
                          key={item.name}
                        />
                      );
                    } else if (item.name === "Jobs") {
                      return (
                        <a
                          href={item.url}
                          rel="noreferrer"
                          key={item.name}
                          className={classNames(
                            item.name === section
                              ? "text-gray-900"
                              : "text-gray-600  hover:text-gray-900 ",
                            "block py-2 text-sm font-medium p-1 items-center sm:inline-flex hidden",
                            item.disabled
                              ? "disabled:opacity-50 cursor-not-allowed"
                              : "hover:border-gray-300"
                          )}
                          target="_blank"
                        >
                          {item.name}
                        </a>
                      );
                    }

                    return (
                      <Link href={item.url} passHref key={item.name}>
                        <button
                          disabled={item.disabled}
                          className={classNames(
                            item.name === section
                              ? "text-gray-900"
                              : "text-gray-600  hover:text-gray-900",
                            "block py-2 text-sm text-gray-700 sm:inline-flex hidden items-center text-sm font-medium p-1 ",
                            item.disabled
                              ? "disabled:opacity-50 cursor-not-allowed"
                              : "hover:border-gray-300"
                          )}
                          onClick={() => setSection(item.name)}
                        >
                          {item.name}
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {/* Wallet */}
                <div className="hidden md:flex items-center">
                  <WalletMultiButton
                    style={{
                      backgroundColor: "#10B981",
                      height: "45px",
                      fontSize: "15px",
                    }}
                  />
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center lg:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>
          <MobileMenu
            navigation={navigation}
            secondaryNavigationData={secondaryNavigationData}
            section={section}
            setSection={setSection}
            secondaryNavigation={secondaryNavigation}
            setSecondaryNavigation={setSecondaryNavigation}
          />
        </>
      )}
    </Disclosure>
  );
}

Navbar.prototype = {
  setSection: PropTypes.func.isRequired,
  section: PropTypes.string.isRequired,
  secondaryNavigationData: PropTypes.object.isRequired,
  secondaryNavigation: PropTypes.string.isRequired,
  setSecondaryNavigation: PropTypes.func.isRequired,
};

export default React.memo(Navbar);
