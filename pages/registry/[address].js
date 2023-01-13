import { DatabaseIcon, TerminalIcon } from '@heroicons/react/solid';

import { Container } from '../../components/layout';
import {useEffect, useState} from 'react';
import fetch from '../../utils/fetcher';
import IdlViewer from '../../components/idl-viewer';
import { useRouter } from 'next/router';
import AccountsData from '../../components/accounts-data';
import Custom404 from '../404';
import { getBaseUrl } from '../../utils/get-base-url';

const tabs = [
  { name: 'IDL', icon: TerminalIcon, disabled: false },
  { name: 'Accounts Data', icon: DatabaseIcon, disabled: true }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${getBaseUrl()}/api/idl?address=${params.address}`);

  return {
    props: {
      data: res
    },
    revalidate: 3600
  };
}
export default function IDLViewerPage({ data }) {
  const [selectedTab, setSelectedTab] = useState('IDL');
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes('/registry')) {
      switch (router.query.tab) {
        case 'Accounts Data':
          setSelectedTab('Accounts Data');
          break;
        default:
          setSelectedTab('IDL');
          break;
      }
    }
  }, [router.pathname, router.query.tab]);

  const metaTags = {
    title: data.name ? `SolDev - ${data.name}` : 'SolDev - IDL Registry',
    description: 'Solana deployed IDLs',
    url: 'https://soldev.app/registry/',
    shouldIndex: true
  };

  if (!(data && data.idl && data.address && data.address.length === 43)) {
    return <Custom404 idl={true} />;
  }

  return (
    <Container metaTags={metaTags}>
      <div className="xs:text-xs mx-auto flex max-w-screen-xl flex-col px-5 text-base">
        <div className="justify-between gap-2 lg:flex">

          {/* IDL name */}
          <h1 className="text-xl font-bold capitalize tracking-tight md:text-3xl 2xl:text-4xl text-sky-500 hover:text-sky-600 dark:text-sky-600 dark:hover:text-sky-700">
            {data.name}
          </h1>

          {/* explorer link */}
          <h2 className="mt-2 flex gap-1 pr-10 text-sky-500 hover:text-sky-600 dark:text-sky-600 dark:hover:text-sky-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            <a
              target="_blank"
              href={`https://explorer.solana.com/address/${data.address}`}
              className="cursor-pointer truncate font-medium tracking-wide hover:underline"
              rel="noreferrer"
            >
              {data.address}
            </a>
          </h2>
        </div>

        {/* tabs */}
        <div className="mt-5 sm:hidden">
          <div className="border-b border-gray-200 pb-4">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500"
              value={selectedTab}
              onChange={e => {
                setSelectedTab(e.target.value);

                router.push(`/registry/${router.query.address}?tab=${e.target.value}`);
              }}
              defaultValue={selectedTab}
            >
              {tabs.map(tab => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5 hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setSelectedTab(tab.name);

                    router.push(`/registry/${router.query.address}?tab=${tab.name}`);
                  }}
                  className={classNames(
                    tab.name === selectedTab
                      ? 'bg-indigo-100 text-sky-600 hover:text-sky-700'
                      : 'text-gray-500 hover:text-gray-700',
                    'group mb-2 inline-flex items-center rounded-md px-3 py-2 text-sm font-medium font-medium'
                  )}
                  aria-current={tab.name === selectedTab ? 'page' : undefined}
                >
                  <tab.icon
                    className={classNames(
                      tab.name === selectedTab
                        ? 'text-sky-600 hover:text-sky-700'
                        : 'text-gray-500 group-hover:text-gray-700',
                      '-ml-0.5 mr-2 h-5 w-5'
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
        {selectedTab === 'IDL' && data && data.idl && <IdlViewer data={data.idl} />}
        {selectedTab === 'Accounts Data' && data && data.idl.accounts && (
          <AccountsData idl={data.idl} programID={data.address} />
        )}
      </div>
    </Container>
  );
}
