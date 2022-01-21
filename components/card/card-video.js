import PropTypes from "prop-types";
import { memo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FilmIcon, ShareIcon } from "@heroicons/react/solid";
import dynamic from "next/dynamic";

const Share = dynamic(() => import("../share"));

function Card({ content, closeSearch }) {
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="relative flex flex-col rounded-lg max-h-[400px] w-[400px] hover:bg-opacity-80 overflow-visible hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 shadow-lg bg-white dark:bg-gray-800 border border-stone-200 dark:border-stone-700/60 min-h-full">
      <Link
        href={`/library/${content.PlaylistID}/video/${content.SK}`}
        passHref
      >
        <div>
          <Image
            className="object-cover rounded-t-lg cursor-pointer hover:opacity-90"
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
          <p className="text-gray-600 dark:text-stone-200 overflow-hidden prose h-[100px]">
            {content.Title}
          </p>
        </div>

        <div className="flex flex-row justify-between items-end h-[40px] pb-2">
          {/* Watch Btn*/}
          <div>
            <Link
              href={`/library/${content.PlaylistID}/video/${content.SK}`}
              passHref
            >
              <button
                onClick={() => closeSearch()}
                className="inline-flex space-x-2 items-center text-gray-600 hover:text-gray-400 dark:text-stone-300 dark:hover:text-stone-500"
              >
                <FilmIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Watch</span>
              </button>
            </Link>
          </div>

          <div> {openShare && <Share content={content} />}</div>

          {/* Share Btn */}
          <div>
            <div className="flex flex-row items-end">
              <button
                type="button"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-stone-300 dark:hover:text-stone-500"
                onClick={() => setOpenShare(!openShare)}
              >
                <ShareIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.defaultProps = {
  closeSearch: () => {},
};

Card.propTypes = {
  content: PropTypes.object.isRequired,
  closeSearch: PropTypes.func,
};

export default memo(Card);
