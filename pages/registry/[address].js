import { DatabaseIcon, ExternalLinkIcon, TerminalIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AccountsData from '../../components/accounts-data';
import IdlViewer from '../../components/idl-viewer';
import { Container } from '../../components/layout';
import fetch from '../../utils/fetcher';

const tabs = [
  { name: 'IDL', icon: TerminalIcon, disabled: false },
  { name: 'Accounts Data', icon: DatabaseIcon, disabled: true }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export async function getStaticPaths() {
  const programs = await fetch(`${process.env.NEXT_PUBLIC_IRONFORGE_API}/idl/all`);

  const paths = programs.map(program => {
    return {
      params: {
        address: program.address
      }
    };
  });

  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IRONFORGE_API}/idl/${params.address}`);

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
    title: data.programName ? `SolDev - ${data.programName}` : 'SolDev - IDL Registry',
    description: 'Solana deployed IDLs',
    url: 'https://soldev.app/registry/',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="xs:text-xs mx-auto mt-5 flex max-w-screen-xl flex-col px-5 text-base">
        <div className="mx-2 mb-10 flex-col gap-3 text-center lg:flex">
          {/* Program name */}

          <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-300">
            {data.programName}
          </h1>

          {/* Explorer link */}
          <h2 className="mx-auto flex items-center gap-1 pr-10 text-lg text-sky-500 hover:text-sky-600">
            <ExternalLinkIcon className="h-6 w-6" />
            <Link
              target="_blank"
              href={`https://explorer.solana.com/address/${data.address}`}
              className="truncate tracking-wide"
            >
              {data.address}
            </Link>
          </h2>
        </div>

        {/* Tabs */}
        <div className="sm:hidden ">
          <div className="border-b border-gray-200 pb-4 dark:border-gray-500">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 dark:border-gray-500"
              value={selectedTab}
              onChange={e => {
                setSelectedTab(e.target.value);

                router.push(`/registry/${router.query.address}?tab=${e.target.value}`);
              }}
            >
              {tabs.map(tab => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200 dark:border-gray-500">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setSelectedTab(tab.name);

                    router.push(`/registry/${router.query.address}?tab=${tab.name}`);
                  }}
                  className={classNames(
                    tab.name === selectedTab
                      ? 'border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300',
                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
                  )}
                  aria-current={tab.name === selectedTab ? 'page' : undefined}
                >
                  <tab.icon
                    className={classNames(
                      tab.name === selectedTab
                        ? 'border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400'
                        : ' text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300',
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
