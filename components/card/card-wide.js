import {
  ExternalLinkIcon,
  EyeOffIcon,
  FilmIcon,
  InboxInIcon,
  PlayIcon
} from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import defineImage from '../../utils/content-imagen';
import Audio from '../audio';

const Badge = dynamic(() => import('../badges/badge.js'));
const CopyLink = dynamic(() => import('./copy-link.js'));

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function CardWide({ content, mode }) {
  const [isS3Audio, setIsS3Audio] = useState(false);
  const imageUrl = defineImage(content);

  let audioPlayer = '';
  if (content.Url) audioPlayer = content.Url.includes('solanalabs-twitter-spaces');

  function actionButton() {
    if (content.Url && content.Url.includes('youtube')) {
      return (
        <div>
          <Link href={`/library/${content.ContentType}/video/${content.SK}`} passHref>
            <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
              <FilmIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Watch</span>
            </button>
          </Link>
        </div>
      );
    } else if (content.Url && content.Url.includes('solanalabs-twitter-spaces')) {
      return (
        <div>
          <button
            onClick={() => setIsS3Audio(!isS3Audio)}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
          >
            {isS3Audio ? (
              <>
                <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Hidde Player</span>
              </>
            ) : (
              <>
                <PlayIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Show Player</span>
              </>
            )}
          </button>
        </div>
      );
    } else {
      return (
        <>
          {content.ContentType === 'newsletter' ? (
            <Link
              href={`/newsletters/${content.SK}`}
              rel="noreferrer"
              passHref
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
            >
              <InboxInIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Read</span>
            </Link>
          ) : (
            <a
              href={content.Url}
              rel="noreferrer"
              target="_blank"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
            >
              <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Open</span>
            </a>
          )}
        </>
      );
    }
  }

  return (
    <div
      className={classNames(
        'flex min-h-full flex-col rounded bg-white dark:bg-gray-800',
        mode === 'dashboard' &&
          'border-2 border-gray-400 shadow-lg hover:opacity-95 ' +
            'shadow-sky-500/30 dark:border-gray-600 dark:shadow-sky-400/20'
      )}
    >
      {imageUrl && content.ContentType === 'newsletter' ? (
        <Link
          href={`/newsletters/${content.SK}`}
          rel="noreferrer"
          passHref
          className="focus:outline-none"
        >
          <div>
            <Image
              className="cursor-pointer object-cover hover:opacity-90"
              src={imageUrl}
              alt=""
              height="350"
              width="700"
              placeholder="blur"
              blurDataURL={imageUrl}
            />
          </div>
        </Link>
      ) : (
        <a href={content.Url} className="focus:outline-none" target="_blank" rel="noreferrer">
          <div>
            <Image
              className="h-80 cursor-pointer rounded-t-lg hover:opacity-90"
              src={imageUrl}
              alt=""
              height="350"
              width="700"
              placeholder="blur"
              blurDataURL={imageUrl}
            />
          </div>
        </a>
      )}

      <div className="px-5 pt-4 pb-5 ">
        <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500 ">
          <div className="flex justify-between ">
            {/*  Title */}
            {content.ContentType === 'newsletter' ? (
              <Link
                href={`/newsletters/${content.SK}`}
                rel="noreferrer"
                passHref
                className="mr-2 focus:outline-none"
              >
                <p className="text-lg font-semibold text-gray-900 hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-600">
                  {content.Title}
                </p>
              </Link>
            ) : (
              <a
                href={content.Url}
                className="mr-2 focus:outline-none"
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-lg font-semibold text-gray-900 hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-600">
                  {content.Title}
                </p>
              </a>
            )}

            {/*  Content Type */}
            {content.ContentType !== 'newsletter' && (
              <Link href={`/library/${content.ContentType}`} passHref>
                <div className="cursor-pointer hover:opacity-80">
                  <Badge text={content.ContentType} />
                </div>
              </Link>
            )}
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
        <div
          className={classNames(
            'prose flex-none overflow-hidden text-ellipsis',
            audioPlayer ? 'min-h-[85px]' : 'min-h-[125px]'
          )}
        >
          <p className="text-gray-600 dark:text-gray-400">{content.Description}</p>
        </div>

        {audioPlayer && (
          <div className="mb-5 h-[35px]">{isS3Audio && <Audio url={content.Url} />}</div>
        )}

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
