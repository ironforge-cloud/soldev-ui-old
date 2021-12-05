import PropTypes from "prop-types";
import { memo, useState } from "react";
import Link from "next/link";
import Share from "../share";
import Image from "next/image";
import { FilmIcon, ShareIcon } from "@heroicons/react/solid";

function Card({ content }) {
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="relative flex flex-col rounded-lg h-[340px] hover:bg-opacity-80 overflow-visible w-[400px] shadow bg-white">
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

      <div className="flex flex-col p-4">
        {/*Title*/}
        <div>
          <p className="text-gray-600 overflow-hidden h-[80px]">
            {content.Title}
          </p>
        </div>

        {/*  Actions */}

        {/* Principal Btn*/}
        <div className="flex justify-between">
          <div>
            <Link
              href={`/library/${content.PlaylistID}/video/${content.SK}`}
              passHref
            >
              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500 items-center">
                <FilmIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">Watch</span>
              </button>
            </Link>
          </div>

          {/* Share Btn */}
          <div>
            <div className="flex flex-row gap-4 items-end">
              {openShare && <Share content={content} />}
              <button
                type="button"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-500"
                onClick={() => setOpenShare(!openShare)}
              >
                <ShareIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">Share</span>
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
