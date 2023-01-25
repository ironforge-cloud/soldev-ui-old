import { FilmIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo } from 'react';

const CopyLink = dynamic(() => import('./copy-link.js'));

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function CardVideo({ content, closeSearch, mode }) {
  return (
    <div
      className={classNames(
        'relative flex max-w-sm flex-col overflow-visible rounded ' +
          'border-2 border-gray-400 bg-white shadow-lg shadow-sky-500/30 hover:bg-opacity-80 ' +
          'dark:border-gray-600 dark:bg-gray-800 dark:shadow-sky-400/20',
        mode !== 'sidebar' && 'transition ease-in-out hover:-translate-y-0.5 hover:scale-105'
      )}
    >
      <Link href={`/library/${content.PlaylistID}/video/${content.SK}`} passHref>
        <Image
          className="h-60 cursor-pointer object-cover hover:opacity-90"
          src={content.Img}
          alt=""
          height="240"
          width="426"
          placeholder="blur"
          blurDataURL={content.Img}
        />
      </Link>

      <div className="flex flex-col justify-between px-4 py-2 ">
        {/*Title*/}
        <div>
          <p className="prose h-[100px] overflow-hidden text-gray-600 dark:text-gray-200">
            {content.Title}
          </p>
        </div>

        <div className="relative mt-5">
          {/* Watch Btn*/}
          <div className="absolute bottom-0 flex w-full flex-row justify-between">
            <Link href={`/library/${content.PlaylistID}/video/${content.SK}`} passHref>
              <button
                onClick={() => closeSearch()}
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
              >
                <FilmIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Watch</span>
              </button>
            </Link>

            {/* Copy Link Btn */}

            <div className="flex flex-row items-end">
              <CopyLink content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardVideo.defaultProps = {
  closeSearch: () => {}
};

CardVideo.propTypes = {
  content: PropTypes.object.isRequired,
  closeSearch: PropTypes.func,
  mode: PropTypes.string
};

export default memo(CardVideo);
