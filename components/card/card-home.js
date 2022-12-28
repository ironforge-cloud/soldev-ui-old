import { ExternalLinkIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo } from 'react';

const CopyLink = dynamic(() => import('./copy-link.js'));

function CardHome({ title, url, contentType, author, tags, description }) {
  function actionButton() {
    if (!url.includes('https://') || url.includes('soldev')) {
      return (
        <Link
          href={url}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
        >
          <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
          <span className="font-medium">Open</span>
        </Link>
      );
    } else {
      return (
        <Link
          href={url}
          rel="noreferrer"
          target="_blank"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
        >
          <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
          <span className="font-medium">Open</span>
        </Link>
      );
    }
  }

  return (
    <div className="mb-10 flex flex-col rounded-lg border border-gray-300 bg-white shadow-lg hover:opacity-95 hover:shadow-sky-500/30 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-sky-400/20">
      <div className="px-5 pt-5">
        <div className="overflow-hidden">
          <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500">
            <div className="flex justify-between">
              {/*  Title */}
              <a href={url} className="mr-2" target="_blank" rel="noreferrer">
                <p className="text-lg font-semibold text-gray-900 hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-600">
                  {title}
                </p>
              </a>
            </div>

            {/*  Author */}
            <div className="mb-2">
              {author && (
                <a href={url} className="" rel="noreferrer" target="_blank">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                    by {author}
                  </p>
                </a>
              )}
            </div>
          </div>

          {/*Tags*/}
          {Array.isArray(tags) && (
            <div className="mb-1 mt-2 cursor-pointer text-sky-500 dark:text-sky-600">
              {Array.isArray(tags) &&
                tags.map((tag, index) => (
                  <span key={index} className="lowercase decoration-rose-500 hover:underline">
                    #{tag}
                    {index < tags.length - 1 && <span>,&nbsp;</span>}
                  </span>
                ))}
            </div>
          )}

          {/*  Description */}
          <p className="mt-1 text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/*  Actions */}
        <div className="relative mt-32">
          <div className="absolute bottom-5 flex w-full flex-row justify-between">
            <div className="">{actionButton()}</div>

            {/* Copy Link Btn */}
            <div>
              <div className="flex flex-row items-end">
                <CopyLink title={title} url={url} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardHome.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.array
};

export default memo(CardHome);
