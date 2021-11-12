import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, CogIcon } from "@heroicons/react/outline";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import Link from "next/link";
import CategorySelector from "./category-selector";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import useUser from "../../hooks/useUser";
import Success from "../notifications/success";
import { useAppDispatch, useAppState } from "../../context/AppContext";
import { navigation } from "../../utils/navigation";

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
  const { user, isAdmin = false, connected, error } = useUser();
  const [editModeNotificationOn, setEditModeNotificationOn] = useState(false);
  const [editModeNotificationOff, setEditModeNotificationOff] = useState(false);
  const appDispatch = useAppDispatch();
  const appState = useAppState();

  // TODO: If error show notification banner

  // Change edit mode state send notification
  const onEditMode = () => {
    appDispatch({ type: "editMode", payload: !appState.editMode });

    if (!appState.editMode) {
      setEditModeNotificationOn(true);
      setTimeout(() => {
        setEditModeNotificationOn(false);
      }, 3000);
    } else {
      setEditModeNotificationOff(true);
      setTimeout(() => {
        setEditModeNotificationOff(false);
      }, 3000);
    }
  };

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open, close }) => (
        <>
          <div className="mx-auto">
            <div className="flex justify-between h-16">
              {/* Logo and Navigation */}
              <div className="flex">
                <div className="relative flex-shrink-0 flex items-center cursor-pointer lg:mr-4">
                  <Link href={`/library/${appState.vertical}`} passHref>
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

              {/* Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Profile Button */}
              <div className="hidden md:flex items-center mr-5">
                {connected ? (
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className="h-8 w-8 rounded-full"
                          src="/avatar.svg"
                          height="32px"
                          width="32px"
                          alt="avatar"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform-gpu opacity-0 scale-95"
                      enterTo="transform-gpu opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform-gpu opacity-100 scale-100"
                      leaveTo="transform-gpu opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right text-center w-max absolute right-0 mt-2 px-1 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              disabled
                              className={classNames(
                                // active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-md text-gray-700 w-full disabled:opacity-30 cursor-not-allowed"
                              )}
                            >
                              Your Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              disabled
                              className={classNames(
                                // active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-md text-gray-700 w-full disabled:opacity-30 cursor-not-allowed"
                              )}
                            >
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                        {isAdmin && (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => onEditMode()}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-md text-gray-700 w-full flex"
                                )}
                              >
                                <CogIcon
                                  className="block h-7 w-7"
                                  aria-hidden="true"
                                  color={appState.editMode ? "red" : "black"}
                                />
                                <span className="pl-2">
                                  {appState.editMode
                                    ? "Disable Edit Mode"
                                    : "Activate Edit Mode"}
                                </span>
                              </button>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <WalletDisconnectButton
                              style={{
                                background: "none",
                                color: "black",
                                lineHeight: "1.25rem",
                                fontFamily: "inherit",
                              }}
                            />
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="items-center">
                    <WalletMultiButton
                      style={{
                        backgroundColor: "#10B981",
                        height: "45px",
                        fontSize: "15px",
                      }}
                    />
                  </div>
                )}
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
            closeMenu={close}
          />
          <Success
            show={editModeNotificationOn}
            setShow={setEditModeNotificationOn}
            text={"Edit Mode Activated"}
          />
          <Success
            show={editModeNotificationOff}
            setShow={setEditModeNotificationOff}
            text={"Edit Mode Deactivated"}
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
