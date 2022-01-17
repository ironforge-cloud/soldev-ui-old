import PropTypes from "prop-types";
import { memo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  DocumentTextIcon,
  ExternalLinkIcon,
  ShareIcon,
} from "@heroicons/react/solid";
import Image from "next/image";

const Share = dynamic(() => import("../../share"));
const Badge = dynamic(() => import("../../badges/badge.js"));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CardRegular({ content, mode, editContent, closeSearch }) {
  const [openShare, setOpenShare] = useState(false);

  const imageUrl = content.Img ? content.Img : "/placeholder.webp";

  const badgeUrl =
    mode === "search"
      ? `/library/${content.ContentType}`
      : `/library/${content.ContentType}?badge=${content.SpecialTag}`;

  return (
    <div className="flex flex-col rounded-lg border max-h-[540px] border-gray-300 dark:border-stone-700/60 shadow-lg hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20hover:opacity-95 bg-white dark:bg-gray-800 w-[400px]">
      <a href={content.Url} target="_blank" rel="noreferrer">
        <Image
          className="object-cover rounded-t-lg cursor-pointer hover:opacity-90"
          src={imageUrl}
          alt=""
          height="200"
          width="400"
          quality="100"
          placeholder="blur"
          blurDataURL={imageUrl}
        />
      </a>

      <div className="px-5 pt-5">
        <div className="overflow-hidden h-[275px]">
          <div className="border-b-2 border-dashed border-gray-700 dark:border-stone-500">
            <div className="flex justify-between">
              {/*  Title */}
              <a
                href={content.Url}
                className="mr-2"
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-lg font-semibold text-gray-900 dark:text-stone-200 hover:text-sky-500 dark:hover:text-sky-600">
                  {content.Title}
                </p>
              </a>

              {/*  Badge */}
              {/*// TODO: fix technical debt that is requiring the "0" check. It's in the API*/}
              {/*{content.SpecialTag !== "0" ||  && (*/}
              <Link href={badgeUrl} passHref>
                {mode === "search" ? (
                  <Badge text={content.ContentType} />
                ) : (
                  <>
                    {content.SpecialTag !== "0" && (
                      <Badge text={content.SpecialTag} />
                    )}
                  </>
                )}
              </Link>
            </div>

            {/*  Author */}
            <div className="mb-2">
              {content.Author && (
                <a
                  href={content.Url}
                  className=""
                  rel="noreferrer"
                  target="_blank"
                >
                  <p className="text-xs uppercase font-semibold tracking-wide text-gray-500 dark:text-stone-500">
                    by {content.Author}
                  </p>
                </a>
              )}
            </div>
          </div>

          {/*Tags*/}
          {Array.isArray(content.Tags) && (
            <div className="mb-1 mt-2 text-sky-500 dark:text-sky-600 cursor-pointer">
              {content.Tags.map((tag, index) => (
                <Link
                  key={tag}
                  href={`/library/${content.ContentType}/filter/?tag=${tag}`}
                  passHref
                >
                  <button
                    className="hover:underline decoration-rose-500 lowercase"
                    onClick={() => closeSearch()}
                  >
                    #{tag}
                    {index < content.Tags.length - 1 && <span>,&nbsp;</span>}
                  </button>
                </Link>
              ))}
            </div>
          )}

          {/*  Description */}
          <p className="text-gray-600 dark:text-stone-400">
            {content.Description}
          </p>
        </div>
        {/*  Actions */}
        <div className="flex flex-row justify-between items-end pt-2 h-[40px] pb-5">
          <div>
            {mode === "edit" ? (
              <button
                className="inline-flex space-x-2 text-red-600 hover:text-red-400 dark:text-red-500 dark:hover:text-red-400 items-center"
                onClick={() => {
                  closeSearch();
                  editContent(content);
                }}
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
      </div>
    </div>
  );
}

CardRegular.defaultProps = {
  closeSearch: () => {},
};

CardRegular.propTypes = {
  content: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  editContent: PropTypes.func.isRequired,
  closeSearch: PropTypes.func,
};

export default memo(CardRegular);
