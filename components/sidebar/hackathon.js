import { memo } from 'react';
import { SpeakerphoneIcon } from '@heroicons/react/outline';
import Link from 'next/link';

function Hackathon() {
  return (
    <section className="rounded-lg p-6 shadow ">
      <div className="mb-5 flex flex-1 gap-2">
        <span className="flex rounded-lg p-2 text-gray-900 dark:text-gray-200">
          <SpeakerphoneIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="prose flex flex-col font-medium text-gray-900 dark:text-gray-200">
          <span className="text-xl">Check out &quot;The&quot; Solana Development Course</span>
        </p>
      </div>
      <Link href="/course">
        <a className="text-md flex items-center justify-center rounded-md border bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 font-medium shadow-sm hover:from-pink-500 ">
          Learn more
        </a>
      </Link>
    </section>
  );
}

export default memo(Hackathon);
