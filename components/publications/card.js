import PropTypes from "prop-types";
import { memo } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import Badge from "../badges/badge.js";
import Link from "next/link";

function Card({ content, editMode, editContent }) {
  return (
    <div className="relative flex flex-col py-6  pl-6 pr-4 rounded-lg shadow-lg bg-yellow-100  hover:bg-opacity-80 hover:opacity-95 w-[320px] h-[340px] overflow-visible">
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
      <div className="mb-2 text-sky-500 cursor-pointer">
        {content.Tags.map((tag, index) => (
          <Link
            key={tag}
            href={`/library/${content.Vertical}/${content.ContentType}/tag/${tag}`}
            passHref
          >
            <span className="hover:font-semibold">
              {tag}
              {index < content.Tags.length - 1 && <>{", "}</>}
            </span>
          </Link>
        ))}
      </div>

      {/*  Description */}
      <div className="flex-1">
        <p className="text-gray-600">{content.Description}</p>
      </div>

      {/*  Actions */}
      <div className="flex justify-between pr-2">
        <div className="space-x-2">
          {editMode ? (
            <button
              className="inline-flex items-center border border-yellow-50 px-3 py-2  shadow-md text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              onClick={() => editContent(content)}
            >
              Edit Data
            </button>
          ) : (
            <a
              href={content.Url}
              rel="noreferrer"
              target="_blank"
              className="inline-flex items-center border border-yellow-50 px-3 py-2  shadow-md text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Details
            </a>
          )}

          <button
            type="button"
            className="inline-flex items-center border border-yellow-50 px-3 py-2  shadow-md text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Share∑
          </button>
        </div>
      </div>
      {editMode && (
        <div className="absolute -top-1 right-0">
          <PencilIcon className="animate-bounce h-6 w-6" />
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  content: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  editContent: PropTypes.func.isRequired,
};

export default memo(Card);
