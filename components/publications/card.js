import PropTypes from "prop-types";
import { memo, useState } from "react";
import { PencilIcon } from "@heroicons/react/outline";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  DocumentTextIcon,
  ExternalLinkIcon,
  ShareIcon,
} from "@heroicons/react/solid";

const Share = dynamic(() => import("../share"));
const Badge = dynamic(() => import("../badges/badge.js"));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Card({ content, mode, editContent, defaultOpenShare }) {
  const [openShare, setOpenShare] = useState(defaultOpenShare);

  let badgeUrl = "";
  if (mode === "dashboard") {
    badgeUrl = `/library/${content.ContentType}`;
  } else {
    badgeUrl = `/library/${content.ContentType}?badge=${content.SpecialTag}`;
  }

  return (
    <div
      className={classNames(
        "relative flex flex-col px-6 pt-6 pb-5 rounded-lg overflow-visible min-h-full",
        mode === "modal"
          ? "h-[400px] sm:h-[340px] max-w-[400px] sm:max-w-[500px]"
          : "shadow-lg hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 hover:bg-opacity-80 hover:opacity-95 bg-white dark:bg-stone-800",
        mode === "dashboard" &&
          "min-h-[300px] max-h-[340px] min-w-[400px] max-w-[700px]",
        (mode === "" || mode === "edit") &&
          "h-[340px] w-[400px] transition ease-in-out duration-150 hover:scale-105"
      )}
    >
      <div className="border-b-2 border-dashed border-gray-700 dark:border-stone-500">
        <div className="flex justify-between">
          {/*  Title */}
          <a
            href={content.Url}
            className="mr-2"
            rel="noreferrer"
            target="_blank"
          >
            <p className="text-lg font-semibold text-gray-900 dark:text-stone-200 hover:text-sky-500 dark:hover:text-sky-600">
              {content.Title}
            </p>
          </a>

          {/*  Badge */}
          {/*// TODO: fix technical debt that is requiring the "0" check. It's in the API*/}
          {content.SpecialTag !== "0" && (
            <Link href={badgeUrl} passHref>
              <div className="cursor-pointer hover:opacity-80">
                {mode === "dashboard" ? (
                  <Badge text={content.ContentType} />
                ) : (
                  <Badge text={content.SpecialTag} />
                )}
              </div>
            </Link>
          )}
        </div>

        {/*  Author */}
        <div className="mb-2">
          {content.Author && (
            <a href={content.Url} className="" rel="noreferrer" target="_blank">
              <p className="text-xs uppercase font-semibold tracking-wide text-gray-500 dark:text-stone-500">
                by {content.Author}
              </p>
            </a>
          )}
        </div>
      </div>

      {/*Tags*/}
      <div className="mb-1 mt-2 text-sky-500 dark:text-sky-600 cursor-pointer">
        {content.Tags.map((tag, index) => (
          <Link
            key={tag}
            href={`/library/${content.ContentType}?tag=${tag}`}
            passHref
          >
            <span>
              <span className="hover:underline decoration-rose-500 lowercase">
                #{tag}
              </span>
              <span>{index < content.Tags.length - 1 && <>{", "}</>}</span>
            </span>
          </Link>
        ))}
      </div>

      {/*  Description */}
      <div className="flex-1 text-ellipsis overflow-hidden prose">
        <p className="text-gray-600 dark:text-stone-400">
          {content.Description}
        </p>
      </div>

      {/*  Actions */}
      <div className="flex flex-row justify-between items-end pt-2">
        <div>
          {mode === "edit" ? (
            <button
              className="inline-flex space-x-2 text-gray-600 hover:text-gray-400 dark:text-stone-300 dark:hover:text-stone-500 items-center"
              onClick={() => editContent(content)}
            >
              <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Edit Data</span>
            </button>
          ) : (
            <a
              href={content.Url}
              rel="noreferrer"
              target="_blank"
              className="inline-flex space-x-2 text-gray-600 hover:text-gray-400 dark:text-stone-300 dark:hover:text-stone-500 items-center"
            >
              <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Open</span>
            </a>
          )}
        </div>

        <div>{openShare && <Share content={content} />}</div>

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

      {mode === "edit" && (
        <div className="absolute -top-1 right-0">
          <PencilIcon className="animate-bounce h-6 w-6 dark:text-stone-300" />
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
