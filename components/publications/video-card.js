import PropTypes from "prop-types";
import { memo, useState } from "react";
import Link from "next/link";
import Share from "../share";
import Image from "next/image";
import { FilmIcon, ShareIcon } from "@heroicons/react/solid";

function Card({ content }) {
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="relative flex flex-col rounded-lg h-[340px] hover:bg-opacity-80 overflow-visible w-[400px] shadow bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 min-h-full transition ease-in-out duration-150 hover:-translate-y-2">
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
          <p className="text-gray-600 dark:text-stone-200 overflow-hidden prose h-[86px]">
            {content.Title}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          {/* Watch Btn*/}
          <div>
            <Link
              href={`/library/${content.PlaylistID}/video/${content.SK}`}
              passHref
            >
              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500 items-center dark:text-stone-300 dark:hover:text-stone-500">
                <FilmIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900 dark:text-stone-300 dark:hover:text-stone-500">
                  Watch
                </span>
              </button>
            </Link>
          </div>

          <div> {openShare && <Share content={content} />}</div>

          {/* Share Btn */}
          <div>
            <div className="flex flex-row items-end">
              <button
                type="button"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-500 dark:text-stone-300 dark:hover:text-stone-500"
                onClick={() => setOpenShare(!openShare)}
              >
                <ShareIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900 dark:text-stone-300 dark:hover:text-stone-500">
                  Share
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  content: PropTypes.object.isRequired,
};

export default memo(Card);
