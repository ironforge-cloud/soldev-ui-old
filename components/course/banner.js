import { memo } from 'react';

function CourseBanner() {
  return (
    <p className="prose flex justify-center pt-1 pb-2 text-gray-700 dark:text-gray-300">
      <span className="">
        created by{' '}
        <a
          href="https://twitter.com/jamesrp13"
          target="_blank"
          rel="noreferrer"
          className="no-underline hover:underline"
        >

          James Pacheco
        </a>{' '}
        and{' '}
        <a
          href="https://github.com/Unboxed-Software/solana-course/graphs/contributors?type=a"
          target="_blank"
          rel="noreferrer"
          className="no-underline hover:underline"
        >
          others
        </a>
      </span>
    </p>
  );
}

export default memo(CourseBanner);
