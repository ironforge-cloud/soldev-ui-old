import { SpeakerphoneIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { memo } from 'react';

function Hackathon() {
  return (
    <section className="rounded-lg p-6 shadow ">
      <div className="mb-5 flex flex-1 gap-2">
        <span className="flex rounded-lg p-2 text-gray-900 dark:text-gray-200">
          <SpeakerphoneIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="prose flex flex-col font-medium text-gray-900 dark:text-gray-200">
          <span className="text-xl">Check out the Solana Development Course</span>
        </p>
      </div>
      <Link
        href="/course"
        className="text-md flex items-center justify-center rounded-md border border-none bg-gradient-to-r from-pink-500 to-blue-500 px-4 py-2 font-medium hover:opacity-90 dark:hover:opacity-90"
      >
        Learn more
      </Link>
    </section>
  );
}

export default memo(Hackathon);
