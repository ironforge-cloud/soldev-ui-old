import PropTypes from "prop-types";
import { memo, useState } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import Badge from "../badges/badge.js";
import Link from "next/link";
import Share from "../share";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ content, mode, editContent, defaultOpenShare }) {
  const [openShare, setOpenShare] = useState(defaultOpenShare);

  return (
    <div
      className={classNames(
        "relative flex flex-col pt-6 pb-5 pl-6 pr-4 rounded-lg h-[340px] overflow-visible",
        mode === "modal"
          ? "w-[400px]"
          : "w-[335px] shadow-lg hover:bg-opacity-80 hover:opacity-95 bg-yellow-100 "
      )}
    >
      <div className="flex justify-between">
        <a href={content.Url} className="" rel="noreferrer" target="_blank">
          {/*  Title */}
          <p className="text-lg font-semibold text-gray-900">{content.Title}</p>
        </a>
        {/*  Badge */}
        <Link
          href={`/library/${content.Vertical}/${content.ContentType}/badge/${content.SpecialTag}`}
          passHref
        >
          <div className="cursor-pointer hover:opacity-80">
            <Badge text={content.SpecialTag} />
          </div>
        </Link>
      </div>

      {/*  Author */}
      <div className="mb-6">
        {content.Author && (
          <a href={content.Url} className="" rel="noreferrer" target="_blank">
            <p className="text-xs uppercase font-semibold tracking-wide text-gray-500">
              by {content.Author}
            </p>
          </a>
        )}
      </div>

      {/*Tags*/}
      <div className="mb-2 text-indigo-500  cursor-pointer">
        {content.Tags.map((tag, index) => (
          <Link
            key={tag}
            href={`/library/${content.Vertical}/${content.ContentType}/tag/${tag}`}
            passHref
          >
            <span>
              <span className="hover:font-semibold">{tag}</span>
              <span>{index < content.Tags.length - 1 && <>{", "}</>}</span>
            </span>
          </Link>
        ))}
      </div>

      {/*  Description */}
      <div className="flex-1 overflow-hidden overflow-ellipsis">
        <p className="text-gray-600">{content.Description}</p>
      </div>

      {/*  Actions */}
      <div className="flex justify-between">
        <div className="space-x-2">
          {mode === "edit" ? (
            <button
              className="inline-flex items-center border border-yellow-50 px-3 py-2.5 shadow-md text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={() => editContent(content)}
            >
              Edit Data
            </button>
          ) : (
            <a
              href={content.Url}
              rel="noreferrer"
              target="_blank"
              className="inline-flex items-center border border-yellow-50 px-3 py-2.5 shadow-md text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Details
            </a>
          )}

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
      {mode === "edit" && (
        <div className="absolute -top-1 right-0">
          <PencilIcon className="animate-bounce h-6 w-6" />
        </div>
      )}
    </div>
  );
}

Card.defaultProps = {
  defaultOpenShare: false,
};

Card.propTypes = {
  content: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  editContent: PropTypes.func.isRequired,
  defaultOpenShare: PropTypes.bool,
};

export default memo(Card);
