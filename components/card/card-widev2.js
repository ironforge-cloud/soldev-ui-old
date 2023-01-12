import { FilmIcon, InboxInIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo } from 'react';
import defineImage from '../../utils/content-imagen';

const CopyLink = dynamic(() => import('./copy-link.js'));

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function CardWide({ content, mode }) {
  const imageUrl = defineImage(content);

  let url = '';
  if (content.Url && content.Url.includes('youtube')) {
    url = `/library/${content.PlaylistID}/video/${content.SK}`;
  } else if (content.ContentType === 'newsletters') {
    url = `/newsletters/${content.SK}`;
  }

  function actionButton() {
    if (content.Url && content.Url.includes('youtube')) {
      return (
        <div>
          <Link href={url} passHref>
            <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
              <FilmIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Watch</span>
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <Link
          href={url}
          rel="noreferrer"
          passHref
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
        >
          <InboxInIcon className="h-5 w-5" aria-hidden="true" />
          <span className="font-medium">Read</span>
        </Link>
      );
    }
  }

  return (
    <div
      className="flex max-w-2xl flex-col rounded border-2 border-gray-400
    bg-white shadow-lg shadow-sky-500/30 hover:opacity-95
    dark:border-gray-600 dark:bg-gray-800 dark:shadow-sky-400/20"
    >
      <Link href={url} rel="noreferrer" passHref className="focus:outline-none">
        <Image
          className="w-full cursor-pointer object-fill hover:opacity-90"
          src={imageUrl}
          alt=""
          height="360"
          width="480"
          placeholder="blur"
          blurDataURL={imageUrl}
        />
      </Link>

      <div className="px-5 pt-4 pb-5 ">
        <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500 ">
          <div className="flex justify-between ">
            {/*  Title */}
            <Link href={url} rel="noreferrer" className="mr-2 focus:outline-none">
              <p className="text-lg font-semibold text-gray-900 hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-600">
                {content.Title}
              </p>
            </Link>
          </div>

          {/*  Author */}
          <div className="mb-2">
            {content.Author && (
              <a href={content.Url} className="" rel="noreferrer" target="_blank">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                  by {content.Author}
                </p>
              </a>
            )}
          </div>
        </div>

        {/*Tags*/}
        {Array.isArray(content.Tags) && (
          <div className="mb-1 mt-2 cursor-pointer text-sky-500 dark:text-sky-600">
            {content.Tags.map((tag, index) => (
              <Link key={tag} href={`/library/${content.ContentType}/filter/?tag=${tag}`} passHref>
                <button className="lowercase decoration-rose-500 hover:underline">
                  #{tag}
                  {index < content.Tags.length - 1 && <span>,&nbsp;</span>}
                </button>
              </Link>
            ))}
          </div>
        )}

        {/*  Description */}
        <div className={classNames('prose h-[119px] flex-none overflow-hidden text-ellipsis')}>
          <p className="text-gray-600 dark:text-gray-400">{content.Description}</p>
        </div>

        {/*  Actions */}
        <div className="flex h-[40px] flex-row items-end justify-between pt-2">
          <div>{actionButton()}</div>

          {/* Copy Link Btn */}
          <div>
            <div className="flex flex-row items-end">
              <CopyLink content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardWide.propTypes = {
  content: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

export default memo(CardWide);
