import PropTypes from 'prop-types';
import { memo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { DocumentTextIcon, ExternalLinkIcon, FilmIcon, InboxInIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import defineImage from '../../utils/content-imagen';

const Badge = dynamic(() => import('../badges/badge.js'));
const CopyLink = dynamic(() => import('./copy-link.js'));

function CardRegular({ content, mode, editContent, closeSearch }) {
  const imageUrl = defineImage(content);

  const badgeUrl =
    mode === 'search'
      ? `/library/${content.ContentType}`
      : `/library/${content.ContentType}/filter?badge=${content.SpecialTag}`;

  function actionButton() {
    if (content.Url.includes('youtube')) {
      return (
        <div>
          <Link href={`/library/${content.ContentType}/video/${content.SK}`} passHref>
            <button
              onClick={() => closeSearch()}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
            >
              <FilmIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Watch</span>
            </button>
          </Link>
        </div>
      );
    } else {
      return (
        <>
          {content.ContentType === 'newsletters' ? (
            <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
              <a className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
                <InboxInIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Read</span>
              </a>
            </Link>
          ) : (
            <a
              href={content.SK}
              rel="noreferrer"
              target="_blank"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
            >
              <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Open</span>
            </a>
          )}
        </>
      );
    }
  }

  return (
    <div className="flex max-h-[540px] w-[400px] flex-col rounded-lg border border-gray-300 bg-white shadow-lg hover:opacity-95 hover:shadow-sky-500/30 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-sky-400/20">
      {content.ContentType === 'newsletters' ? (
        <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
          <a>
            <Image
              className="cursor-pointer rounded-t-lg object-cover hover:opacity-90"
              src={imageUrl}
              alt=""
              height="200"
              width="400"
              quality="100"
              placeholder="blur"
              blurDataURL={imageUrl}
            />
          </a>
        </Link>
      ) : (
        <a href={content.Url} target="_blank" rel="noreferrer">
          <Image
            className="cursor-pointer rounded-t-lg object-cover hover:opacity-90"
            src={imageUrl}
            alt=""
            height="200"
            width="400"
            quality="100"
            placeholder="blur"
            blurDataURL={imageUrl}
          />
        </a>
      )}

      <div className="px-5 pt-5">
        <div className="h-[275px] overflow-hidden">
          <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500">
            <div className="flex justify-between">
              {/*  Title */}
              {content.ContentType === 'newsletters' ? (
                <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
                  <a className="mr-2">
                    <p className="text-lg font-semibold text-gray-900 hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-600">
                      {content.Title}
                    </p>
                  </a>
                </Link>
              ) : (
                <a href={content.Url} className="mr-2" target="_blank" rel="noreferrer">
                  <p className="text-lg font-semibold text-gray-900 hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-600">
                    {content.Title}
                  </p>
                </a>
              )}
              {/*  Badge */}
              <Link href={badgeUrl} passHref>
                <div className="cursor-pointer hover:opacity-80" onClick={() => closeSearch()}>
                  {mode === 'search' ? (
                    <Badge text={content.ContentType} />
                  ) : (
                    <>{content.SpecialTag !== '0' && <Badge text={content.SpecialTag} />}</>
                  )}
                </div>
              </Link>
            </div>

            {/*  Author */}
            <div className="mb-2">
              {content.Author && (
                <a href={content.Url} className="" rel="noreferrer" target="_blank">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                    by {content.Author}
                  </p>
                </a>
              )}
            </div>
          </div>

          {/*Tags*/}
          {Array.isArray(content.Tags) && (
            <div className="mb-1 mt-2 cursor-pointer text-sky-500 dark:text-sky-600">
              {content.Tags.map((tag, index) => (
                <Link
                  key={tag}
                  href={`/library/${content.ContentType}/filter/?tag=${tag}`}
                  passHref
                >
                  <button
                    className="lowercase decoration-rose-500 hover:underline"
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
          <p className="text-gray-600 dark:text-gray-400">{content.Description}</p>
        </div>
        {/*  Actions */}
        <div className="flex h-[40px] flex-row items-end justify-between pt-2 pb-5">
          <div>
            {mode === 'edit' ? (
              <button
                className="inline-flex items-center space-x-2 text-red-600 hover:text-red-400 dark:text-red-500 dark:hover:text-red-400"
                onClick={() => {
                  closeSearch();
                  editContent(content);
                }}
              >
                <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Edit Data</span>
              </button>
            ) : (
              actionButton()
            )}
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

CardRegular.defaultProps = {
  closeSearch: () => {}
};

CardRegular.propTypes = {
  content: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  editContent: PropTypes.func.isRequired,
  closeSearch: PropTypes.func
};

export default memo(CardRegular);
