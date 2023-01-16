import { ClipboardListIcon, DownloadIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Container } from '../../components/layout';
import fetch from '../../utils/fetcher';

const Searchbar = dynamic(() => import('../../components/searchbar'));

export async function getStaticProps({}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_IRONFORGE_API}/idl/all`);

  return {
    props: {
      data: res
    },
    revalidate: 3600
  };
}

export default function Registry({ data }) {
  const [searchValue, setSearchValue] = useState('');

  const metaTags = {
    title: 'SolDev - IDL Registry',
    description: 'Solana deployed IDLs',
    url: 'https://soldev.app/registry',
    shouldIndex: true
  };

  async function downloadIDL(program) {
    // Fetch idl from the API
    const data = await fetch(`${process.env.NEXT_PUBLIC_IRONFORGE_API}/idl/${program.address}`);

    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(data.idl, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${program.programName}.json`;
    document.body.appendChild(element);
    element.click();
  }

  if (searchValue !== '') {
    data = data.filter(program => {
      if (program.programName.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      if (program.address.includes(searchValue)) return true;

      return false;
    });
  }

  return (
    <Container metaTags={metaTags}>
      <div className="container mx-auto flex min-h-screen flex-col items-center">
        <Image
          className="max-w-sm"
          alt="hero"
          src="/banner-idl.svg"
          width="400"
          height="300"
          priority
        />
        <div className="mt-10 flex w-full items-center justify-center">
          <div className="w-full sm:w-8/12">
            <Searchbar searchValue={searchValue} setSearchValue={setSearchValue} />
          </div>
        </div>

        <ul
          role="list"
          className="grid grid-cols-1 gap-6 py-10 lg:mt-10 xl:grid-cols-2 2xl:grid-cols-3"
        >
          {data.map((program, index) => (
            <li
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition ease-in-out
              hover:-translate-y-0.5 hover:scale-105 hover:opacity-95 dark:bg-gray-700"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-lg font-medium text-gray-900 dark:text-gray-100">
                      {program.programName}
                    </h3>
                    <span
                      className="inline-block flex-shrink-0 rounded-full bg-green-200 px-2 py-0.5 text-xs
                    font-medium tracking-wider text-gray-900 dark:bg-red-500 dark:text-red-50"
                    >
                      mainnet
                    </span>
                  </div>
                  <p className="mt-2 truncate text-sm text-gray-500 dark:text-gray-300">
                    {program.address}
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200 dark:divide-gray-500">
                  <div className="flex w-0 flex-1">
                    <button
                      onClick={() => downloadIDL(program)}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center
                      justify-center rounded-bl-lg border border-transparent py-4 text-sm
                      font-medium text-gray-700 hover:text-gray-500 dark:border-gray-500 dark:text-gray-300"
                    >
                      <DownloadIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                      <span className="ml-3">Download</span>
                    </button>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <Link
                      href={`/registry/${program.address}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center
                       rounded-br-lg border border-transparent py-4 text-sm font-medium
                        text-gray-700 hover:text-gray-500 dark:border-gray-500 dark:text-gray-300"
                    >
                      <ClipboardListIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
                      <span className="ml-3">Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
