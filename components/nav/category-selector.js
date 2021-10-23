import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { ChartBarIcon, CursorClickIcon } from "@heroicons/react/outline";
import Link from "next/link";

const solutions = [
  {
    name: "Solana",
    description: "Fundamentals, Podcasts, Conferences",
    href: "/library/Solana",
    icon: ChartBarIcon,
  },
  {
    name: "Rust",
    description: "Rust Programming Language",
    href: "/library/Rust",
    icon: CursorClickIcon,
  },
  {
    name: "Web3",
    description: "JavaScript, TypeScript, Web3.js, etc...",
    href: "/library/Web3",
    icon: CursorClickIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CategorySelector({ item, setSection, section }) {
  return (
    <Popover
      className={classNames(
        item.name === section
          ? "border-indigo-500 inline-flex items-center"
          : "border-transparent inline-flex items-center",
        "block py-2 text-sm text-gray-700 pt-1 border-b-2 relative"
      )}
    >
      {({ open }) => (
        <>
          <Popover.Button className="inline-flex">
            <span
              className={classNames(
                item.name === section
                  ? "text-gray-900 text-sm font-medium"
                  : "text-gray-500 hover:text-gray-700 text-sm font-medium"
              )}
            >
              Library
            </span>
            <ChevronDownIcon
              className="text-gray-600 ml-1 h-5 w-5 group-hover:text-gray-500 transition ease-in-out duration-150"
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute top-14 z-10 mt-3 px-2 w-screen max-w-md sm:px-0 lg:max-w-3xl">
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                  {solutions.map((item) => (
                    <Link key={item.name} href={item.href} passHref>
                      <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-100 transition ease-in-out duration-150">
                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-base font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
