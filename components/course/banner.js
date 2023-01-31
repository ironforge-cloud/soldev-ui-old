import { memo } from 'react';
import Link from 'next/link';

function CourseBanner() {
  return (
    <p className="prose flex mx-auto pt-1 pb-2 text-gray-700 dark:text-gray-300">
      <span className="">
        created by{' '}
        <Link
          href="https://twitter.com/jamesrp13"
          target="_blank"
          rel="noreferrer"
          className="font-semibold no-underline hover:underline dark:text-gray-200"
        >
          James Pacheco
        </Link>{' '}
        and{' '}
        <Link
          href="https://github.com/Unboxed-Software/solana-course/graphs/contributors?type=a"
          target="_blank"
          rel="noreferrer"
          className="font-semibold no-underline hover:underline dark:text-gray-200"
        >
          others
        </Link>
      </span>
    </p>
  );
}

export default memo(CourseBanner);
