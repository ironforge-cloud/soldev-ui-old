import { ExternalLinkIcon, SpeakerphoneIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { memo } from 'react';
import Image from 'next/future/image';

function Hackathon() {
  return (
    <section className="rounded-lg p-6 shadow ">
      <div className="mb-5 flex flex-1 gap-2">
        <span className="flex rounded-lg pt-2 pr-1 text-gray-900 dark:text-gray-200">
          <Image src="/ironforge.png" alt="Ironforge" width="25" height="25" className="h-8 w-9" />
          {/* <SpeakerphoneIcon className="h-6 w-6" aria-hidden="true" /> */}
        </span>
        <p className="prose flex flex-col font-medium ">
          <span className="text-xl text-gray-900 dark:text-gray-200">Ironforge Cloud</span>
          <span className="text-gray-600 dark:text-gray-300">
            Simplify your Solana development.
          </span>
        </p>
      </div>
      <a href="https://www.ironforge.cloud/?utm_source=soldev.app" target="_blank" rel="noreferrer">
        <a className="text-md flex items-center justify-center gap-2 rounded-md border border-none bg-gradient-to-r from-pink-500 to-blue-500 px-4 py-2 font-medium text-gray-50 shadow-sm hover:shadow-xl">
          <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
          Visit
        </a>
      </a>
    </section>
  );
}

export default memo(Hackathon);
