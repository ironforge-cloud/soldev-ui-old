import PropTypes from "prop-types";
import {  memo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import Image from "next/image";
import defineImage from "../../utils/content-imagen";

const Badge = dynamic(() => import("../badges/badge.js"));
const CopyLink = dynamic(() => import("./copy-link.js"));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CardWide({ content, mode }) {
  const imageUrl = defineImage(content)

  return (
    <div
      className={classNames(
        "flex flex-col rounded-lg min-h-full bg-white dark:bg-gray-800",
        mode === "dashboard" &&
          "border border-gray-300 dark:border-gray-700/60 shadow-lg hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 hover:opacity-95"
      )}
    >
      {imageUrl && (
        <a
          href={content.Url}
          className="focus:outline-none"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <Image
              className="object-cover rounded-t-lg cursor-pointer hover:opacity-90"
              src={imageUrl}
              alt=""
              height="350"
              width="700"
              quality="100"
              placeholder="blur"
              blurDataURL={imageUrl}
            />
          </div>
        </a>
      )}

      <div className="px-5 pt-4 pb-5 ">
        <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500 ">
          <div className="flex justify-between ">
            {/*  Title */}
            <a
              href={content.Url}
              className="mr-2 focus:outline-none"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-200 hover:text-sky-500 dark:hover:text-sky-600">
                {content.Title}
              </p>
            </a>

            {/*  Content Type */}
            <Link href={`/library/${content.ContentType}`} passHref>
              <div className="cursor-pointer hover:opacity-80">
                <Badge text={content.ContentType} />
              </div>
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
                <p className="text-xs uppercase font-semibold tracking-wide text-gray-500 dark:text-gray-500">
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
                <button className="hover:underline decoration-rose-500 lowercase">
                  #{tag}
                  {index < content.Tags.length - 1 && <span>,&nbsp;</span>}
                </button>
              </Link>
            ))}
          </div>
        )}

        {/*  Description */}
        <div className="flex-none min-h-[125px] text-ellipsis overflow-hidden prose ">
          <p className="text-gray-600 dark:text-gray-400">
            {content.Description}
          </p>
        </div>

        {/*  Actions */}
        <div className="flex flex-row justify-between items-end pt-2 h-[40px]">
          <div>
            <a
              href={content.Url}
              rel="noreferrer"
              target="_blank"
              className="inline-flex space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 items-center"
            >
              <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Open</span>
            </a>
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

CardWide.propTypes = {
  content: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
};

export default memo(CardWide);
