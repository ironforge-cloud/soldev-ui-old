import PropTypes from "prop-types";
import { memo, useState } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import Badge from "../badges/badge.js";
import Link from "next/link";
import Share from "../share";
import {
  ShareIcon,
  DocumentTextIcon,
  ExternalLinkIcon,
} from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ content, mode, editContent, defaultOpenShare }) {
  const [openShare, setOpenShare] = useState(defaultOpenShare);

  return (
    <div
      className={classNames(
        "relative flex flex-col p-6 rounded-lg h-[340px] w-[400px] overflow-visible",
        mode === "modal"
          ? ""
          : "shadow hover:bg-opacity-80 hover:opacity-95 bg-white"
      )}
    >
      <div className="flex justify-between">
        <a href={content.Url} className="mr-2" rel="noreferrer" target="_blank">
          {/*  Title */}
          <p className="text-lg font-semibold text-gray-900">{content.Title}</p>
        </a>
        {/*  Badge */}
        {content.SpecialTag !== "0" && (
          <Link
            href={`/library/${content.ContentType}?badge=${content.SpecialTag}`}
            passHref
          >
            <div className="cursor-pointer hover:opacity-80">
              <Badge text={content.SpecialTag} />
            </div>
          </Link>
        )}
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
      <div className="mb-2 text-indigo-500 cursor-pointer h-[25px]">
        {content.Tags.map((tag, index) => (
          <Link
            key={tag}
            href={`/library/${content.ContentType}?tag=${tag}`}
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
      <div className="flex-1 overflow-hidden overflow-ellipsis max-h-[170px]">
        <p className="text-gray-600">{content.Description}</p>
      </div>

      {/*  Actions */}
      <div className="flex flex-row justify-between items-end">
        <div>
          {mode === "edit" ? (
            <button
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500 items-center"
              onClick={() => editContent(content)}
            >
              <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">Edit Data</span>
            </button>
          ) : (
            <a
              href={content.Url}
              rel="noreferrer"
              target="_blank"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500 items-center"
            >
              <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">Open</span>
            </a>
          )}
        </div>

        {/* Share Btn */}
        <div>
          <div className="flex flex-row gap-5 items-end">
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
