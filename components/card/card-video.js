import PropTypes from 'prop-types';
import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FilmIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';

const CopyLink = dynamic(() => import('./copy-link.js'));

function Card({ content, closeSearch }) {
  return (
    <div className="relative flex max-h-[400px] min-h-full w-[400px] flex-col overflow-visible rounded-lg border border-gray-200 bg-white shadow-lg hover:bg-opacity-80 hover:shadow-sky-500/30 dark:border-gray-700/60 dark:bg-gray-800 dark:hover:shadow-sky-400/20">
      <Link href={`/library/${content.PlaylistID}/video/${content.SK}`} passHref>
        <div>
          <Image
            className="cursor-pointer rounded-t-lg object-cover hover:opacity-90"
            src={content.Img}
            alt=""
            height="200"
            width="400"
            quality="100"
            placeholder="blur"
            blurDataURL={content.Img}
          />
        </div>
      </Link>

      <div className="flex flex-col justify-between px-4 py-2 ">
        {/*Title*/}
        <div>
          <p className="prose h-[100px] overflow-hidden text-gray-600 dark:text-gray-200">
            {content.Title}
          </p>
        </div>

        <div className="flex h-[40px] flex-row items-end justify-between pb-2">
          {/* Watch Btn*/}
          <div>
            <Link href={`/library/${content.PlaylistID}/video/${content.SK}`} passHref>
              <button
                onClick={() => closeSearch()}
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
              >
                <FilmIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Watch</span>
              </button>
            </Link>
          </div>

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

Card.defaultProps = {
  closeSearch: () => {}
};

Card.propTypes = {
  content: PropTypes.object.isRequired,
  closeSearch: PropTypes.func
};

export default memo(Card);
