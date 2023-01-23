import {
  AcademicCapIcon,
  ChatAlt2Icon,
  ExternalLinkIcon,
  FolderAddIcon,
  HomeIcon,
  NewspaperIcon,
  PaperClipIcon,
  VideoCameraIcon,
  DocumentDuplicateIcon,
  BookOpenIcon
} from '@heroicons/react/outline';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';

const navigation = [
  {
    name: 'Home',
    href: '/',
    icon: HomeIcon,
    disabled: false
  },
  {
    name: 'Newsletters',
    href: '/newsletters',
    icon: NewspaperIcon,
    disabled: false
  },
  {
    name: 'Changelog',
    href: '/changelog',
    icon: VideoCameraIcon,
    disabled: false
  },
  {
    name: 'Community',
    href: '/community',
    icon: ChatAlt2Icon,
    disabled: false
  },
  {
    name: 'IDL Registry',
    href: '/registry',
    icon: DocumentDuplicateIcon,
    disabled: false
  },
  {
    name: 'Solana Specs',
    href: '/specs',
    icon: BookOpenIcon,
    disabled: false
  }
];

const special = [
  {
    name: 'Solana Cookbook',
    href: 'https://solanacookbook.com?utm_source=soldev.app',
    disabled: false
  },
  {
    name: 'Anchor Docs',
    href: 'https://www.anchor-lang.com?utm_source=soldev.app',
    disabled: false
  },
  {
    name: 'Solana Docs',
    href: 'https://docs.solana.com/introduction?utm_source=soldev.app',
    disabled: false
  },
  {
    name: 'Metaplex Docs',
    href: 'https://docs.metaplex.com/?utm_source=soldev.app',
    disabled: false
  },
  {
    name: 'Stack Exchange',
    href: 'https://solana.stackexchange.com/',
    disabled: false
  }
];

const specialLists = [];

const categories = [
  {
    name: 'Tutorials',
    href: '/library/tutorials'
  },
  {
    name: 'Articles',
    href: '/library/articles'
  },
  {
    name: 'Podcasts',
    href: '/library/podcasts'
  },
  {
    name: 'Projects',
    href: '/library/projects'
  },
  {
    name: 'SDKs & Frameworks',
    href: '/library/sdk'
  },
  {
    name: 'Scaffolds',
    href: '/library/scaffolds'
  },
  {
    name: 'Tools',
    href: '/library/tools'
  },
  {
    name: 'Implementations',
    href: '/library/implementations'
  },
  {
    name: 'Security',
    href: '/library/security'
  },
  {
    name: 'Program Library',
    href: '/library/spl'
  },
  {
    name: 'Twitter Threads',
    href: '/library/threads'
  },
  {
    name: 'Video Playlists',
    href: '/library/playlists'
  },
  {
    name: 'Submitted',
    href: '/library/admin/submitted'
  },
  {
    name: 'Inactive',
    href: '/library/admin/inactive'
  }
];

const courses = [
  {
    name: 'Intro to Solana',
    href: '/course'
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavSidebar({ closeMobileMenu }) {
  const [current, setCurrent] = useState('');
  const { user, isAdmin = false, connected, error } = useUser();

  useEffect(() => {
    if (window && window.sessionStorage.getItem('main-navigation')) {
      setCurrent(window.sessionStorage.getItem('main-navigation'));
    } else {
      setCurrent('Home');
    }
  }, []);

  return (
    <nav aria-label="Sidebar" className="top-4 divide-y divide-gray-300 dark:divide-gray-500">
      <div className="pb-4">
        {navigation.map(item => {
          return (
            <Link href={item.href} passHref key={item.name}>
              <button
                className={classNames(
                  item.name === current
                    ? 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-200'
                    : 'text-gray-800 dark:text-gray-300',
                  'group flex min-w-full max-w-[190px] items-center rounded-md px-3 py-2 text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 lg:text-sm'
                )}
                onClick={() => {
                  setCurrent(item.name);
                  window.sessionStorage.setItem('main-navigation', item.name);
                  closeMobileMenu();
                }}
                aria-current={item.current ? 'page' : undefined}
                disabled={item.disabled}
              >
                <item.icon
                  className={classNames(
                    item.name === current ? 'text-gray-500' : 'text-gray-400 ',
                    '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                    !item.disabled && 'group-hover:text-gray-500'
                  )}
                  aria-hidden="true"
                />
                <span className="truncate">{item.name}</span>
              </button>
            </Link>
          );
        })}
      </div>

      <div className="space-y-4 pt-4">
        {/* Add new content*/}
        <Link href="/submit" passHref>
          <div className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm">
            <FolderAddIcon className="h-5 w-5 text-sky-500" aria-hidden="true" />
            <span className="truncate leading-6"> Submit content</span>
          </div>
        </Link>

        {/* Courses */}
        <div>
          <p
            className="text-md px-3 font-semibold uppercase tracking-wider text-gray-500 lg:text-xs"
            id="communities-headline"
          >
            Courses
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {courses.map(item => {
              return (
                <Link href={item.href} passHref key={item.name}>
                  <div
                    onClick={() => closeMobileMenu()}
                    className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm"
                  >
                    <AcademicCapIcon
                      className="h-4 w-4 text-rose-400 dark:text-rose-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6">{item.name}</span>
                    {item.name === '"The" Course' && (
                      <span className="ml-1 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-500 dark:text-red-50">
                        New
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Special */}
        <div>
          <p
            className="text-md px-3 font-semibold uppercase tracking-wider text-gray-500 lg:text-xs"
            id="communities-headline"
          >
            Reference
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {special.map(item => {
              return (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => closeMobileMenu()}
                >
                  <div className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm">
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
        {/*<div>*/}
        {/*  <p*/}
        {/*    className="text-md px-3 font-semibold uppercase tracking-wider text-gray-500 lg:text-xs"*/}
        {/*    id="communities-headline"*/}
        {/*  >*/}
        {/*    Lists*/}
        {/*  </p>*/}
        {/*  <div className="mt-2 space-y-1" aria-labelledby="communities-headline">*/}
        {/*    {specialLists.map(item => {*/}
        {/*      return (*/}
        {/*        <Link href={item.href} passHref key={item.name}>*/}
        {/*          <button*/}
        {/*            onClick={() => closeMobileMenu()}*/}
        {/*            className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm"*/}
        {/*          >*/}
        {/*            <SparklesIcon*/}
        {/*              className="h-4 w-4 text-rose-400 dark:text-rose-500"*/}
        {/*              aria-hidden="true"*/}
        {/*            />*/}
        {/*            <span className="truncate leading-6">{item.name}</span>*/}
        {/*          </button>*/}
        {/*        </Link>*/}
        {/*      );*/}
        {/*    })}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Categories */}
        <div>
          <p
            className="text-md px-3 font-semibold uppercase tracking-wider text-gray-500 lg:text-xs"
            id="communities-headline"
          >
            Categories
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {categories.map(item => {
              if ((item.name === 'Submitted' || item.name === 'Inactive') && !isAdmin) {
                return;
              }

              return (
                <Link href={item.href} passHref key={item.name}>
                  <button
                    onClick={() => closeMobileMenu()}
                    className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-sm"
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
  closeMobileMenu: () => {}
};

NavSidebar.prototype = {
  closeMobileMenu: PropTypes.func
};

export default memo(NavSidebar);
