import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  ChartBarIcon,
  CursorClickIcon,
  SupportIcon,
  FolderAddIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const solutions = [
  {
    name: "Solana",
    description: "Fundamentals, Events, Tools",
    href: "/library/Solana",
    icon: false,
  },
  {
    name: "Rust",
    description: "Rust Programming Language",
    href: "/library/Rust",
    icon: false,
  },
];

const callsToAction = [
  { name: "Submit content", href: "/submit", icon: FolderAddIcon },
  { name: "FAQ", href: "/faq", icon: SupportIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategorySelector({ item, setSection, section }) {
  const [vertical, setVertical] = useState("Solana");
  return (
    <Popover className="relative inline-flex items-center text-sm text-gray-500 pt-4">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              item.name === section
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700",
              "inline-flex text-sm font-medium"
            )}
          >
            <div className="flex flex-col">
              <h2>Catalog</h2>
              <span className="text-xs text-blue-400 uppercase font-bold">
                {vertical}
              </span>
            </div>

            <ChevronDownIcon
              className="ml-1 h-5 w-5 transition ease-in-out duration-100"
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-50"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 transform-gpu translate-y-40 -translate-x-28 sm:translate-y-36 sm:-translate-x-5 mt-5 w-max pt-2">
              {({ close }) => (
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className=" grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                    {solutions.map((item) => (
                      <Link key={item.name} href={item.href} passHref>
                        <button
                          onClick={() => {
                            setVertical(item.name);
                            setSection("Library");
                            close();
                          }}
                          className="-m-3 p-3 flex text-left rounded-lg hover:bg-gray-50 transition ease-in-out duration-150"
                        >
                          {!item.icon ? (
                            item.name === "Rust" ? (
                              <FontAwesomeIcon
                                icon={["fab", "rust"]}
                                size="3x"
                                color="black"
                                className="self-center"
                              />
                            ) : (
                              <Image
                                src="/solana.svg"
                                width="38px"
                                height="38px"
                              />
                            )
                          ) : (
                            <item.icon
                              className="flex-shrink-0 h-6 w-6 text-indigo-600"
                              aria-hidden="true"
                            />
                          )}

                          <div className="ml-4">
                            <p className="text-base font-medium text-gray-900">
                              {item.name}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      </Link>
                    ))}
                  </div>
                  <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                    {callsToAction.map((item) => (
                      <div key={item.name} className="flow-root">
                        <Link href={item.href} passHref>
                          <button
                            className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition ease-in-out duration-150"
                            onClick={() => {
                              close();
                            }}
                          >
                            <item.icon
                              className="flex-shrink-0 h-6 w-6 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-3">{item.name}</span>
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
