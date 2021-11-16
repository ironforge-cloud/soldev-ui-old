import PropTypes from "prop-types";
import { memo, useState } from "react";
import Link from "next/link";
import Share from "../share";
import Image from "next/image";
import { useAppState } from "../../context/AppContext";

function Card({ content }) {
  const appState = useAppState();
  const [openShare, setOpenShare] = useState(false);

  return (
    <div className="relative flex flex-col rounded-lg h-[340px] hover:bg-opacity-80 overflow-visible w-[335px] shadow-lg bg-yellow-100">
      <Link
        href={`/library/${appState.vertical}/${content.PlaylistID}/video/${content.SK}`}
        passHref
      >
        <div>
          <Image
            className="object-cover rounded-t-lg cursor-pointer hover:opacity-90"
            src={content.Img}
            alt=""
            height="200"
            width="355"
            quality="100"
            placeholder="blur"
            blurDataURL={content.Img}
          />
        </div>
      </Link>

      <div className="pt-4 pb-4 pl-4 pr-4">
        {/*Title*/}
        <div className="flex justify-between h-[60px]">
          <p className="font-medium leading-5 text-gray-500 overflow-hidden">
            {content.Title}
          </p>
        </div>

        {/*  Actions */}
        <div className="flex justify-between pt-4">
          <div className="space-x-2">
            <Link
              href={`/library/${appState.vertical}/${content.PlaylistID}/video/${content.SK}`}
              passHref
            >
              <a className="inline-flex items-center border border-yellow-50 px-3 py-2.5 shadow-md text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                Watch
              </a>
            </Link>
            {openShare ? (
              <button
                type="button"
                className="inline-flex rounded-full items-center border border-yellow-50 px-3 py-3 shadow-md text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setOpenShare(!openShare)}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            ) : (
              <button
                type="button"
                className="inline-flex items-center border border-yellow-50 px-3 py-2.5 shadow-md text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                onClick={() => setOpenShare(!openShare)}
              >
                Share
              </button>
            )}
          </div>
          {openShare && <Share content={content} />}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  content: PropTypes.object.isRequired,
};

export default memo(Card);
