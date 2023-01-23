import { memo } from 'react';
import Link from 'next/link';

function Banner({ creator, others }) {
  return (
    <p className="prose flex justify-center pt-1 pb-2 text-gray-700 dark:text-gray-300">
      <span className="">
        {creator.prefixText}{' '}
        <Link
          href={creator.link}
          target="_blank"
          rel="noreferrer"
          className="font-semibold no-underline hover:underline dark:text-gray-200"
        >
          {creator.name}
        </Link>{' '}
        and{' '}
        <Link
          href={others.link}
          target="_blank"
          rel="noreferrer"
          className="font-semibold no-underline hover:underline dark:text-gray-200"
        >
          {others.name}
        </Link>
      </span>
    </p>
  );
}

export default memo(Banner);
