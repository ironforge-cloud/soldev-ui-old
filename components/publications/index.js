import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import { useAppState } from '../../context/AppContext';

const CardWide = dynamic(() => import('../card/card-wide'));
const CardWidev2 = dynamic(() => import('../card/card-widev2'));
const CardVideo = dynamic(() => import('../card/card-video'));
const CardRegular = dynamic(() => import('../card/card-regular'));
const TagsSelector = dynamic(() => import('../badges/tags-selector'));
const Spinner = dynamic(() => import('../spinner'));
const ContentFormModal = dynamic(() => import('./content-form/modal'));

function Publications({
  data,
  title,
  contentType,
  isLoading,
  badges,
  tags,
  tagsList,
  closeSearch,
  cardMode,
  latest
}) {
  const [open, setOpen] = useState(false);
  const appState = useAppState();
  const [content, setContent] = useState({});
  const [positions, setPositions] = useState([0]);

  useEffect(() => {
    // Definition list of positions for manual sort
    let positionsDraft = [0];
    let count = 1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].Position === 0) continue;

      positionsDraft.push(count++);
    }
    positionsDraft.push(count);
    setPositions(positionsDraft);
  }, [data]);

  const editContent = data => {
    setContent(data);
    setOpen(true);
  };

  return (
    <div className="mx-auto mt-2 flex flex-col">
      <div className=" flex flex-col items-center justify-center">
        <h1 className=" w-max text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
          {title}
        </h1>

        {(title === 'Newsletter' || title === 'Changelog') && (
          <p className="prose flex justify-center pt-1 pb-2 text-gray-700 dark:text-gray-300">
            <span className="">
              created by the{' '}
              <Link
                href="https://solana.org/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold no-underline hover:underline dark:text-gray-200"
              >
                Solana Foundation
              </Link>
            </span>
          </p>
        )}
      </div>

      {tags && (
        <div className="mt-5 flex justify-center">
          <TagsSelector tagsList={tagsList} contentType={contentType} badges={badges} tags={tags} />
        </div>
      )}

      {title === 'Newsletter' && (
        <div className="mx-auto mb-20 mt-10 flex max-w-3xl">
          <CardWide mode="dashboard" content={latest} />
        </div>
      )}

      {title === 'Changelog' && (
        <div className="mx-auto mb-20 mt-10 flex max-w-3xl">
          <CardWidev2 mode="changelog" content={latest} />
        </div>
      )}

      {(title === 'Newsletter' || title === 'Changelog') && (
        <div className="prose mx-auto -mb-10 flex w-full justify-center text-xl dark:prose-invert">
          Previous issues
        </div>
      )}

      <div className="mt-10 flex flex-wrap place-content-start justify-center gap-5 py-4 px-2 md:px-6 xl:gap-10">
        {isLoading ? (
          <Spinner />
        ) : (
          data.map(content => {
            //  Initial Tags for content type "Playlists" is null
            if (!content.Tags) content.Tags = [];

            if (content.ContentType !== 'Playlist') {
              return (
                <CardRegular
                  key={content.SK}
                  content={content}
                  mode={appState.editMode && cardMode !== 'search' ? 'edit' : cardMode}
                  editContent={editContent}
                  closeSearch={closeSearch}
                />
              );
            }

            // Playlist Content
            return (
              <div key={content.SK}>
                <CardVideo content={content} closeSearch={closeSearch} />
              </div>
            );
          })
        )}
      </div>
      <ContentFormModal open={open} setOpen={setOpen} content={content} positions={positions} />
    </div>
  );
}

Publications.defaultProps = {
  tags: [],
  badges: [],
  tagsList: [],
  title: '',
  contentType: '',
  cardMode: '',
  latest: {}
};

Publications.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  badges: PropTypes.array,
  tags: PropTypes.array,
  title: PropTypes.string,
  tagsList: PropTypes.array,
  contentType: PropTypes.string,
  closeSearch: PropTypes.func,
  cardMode: PropTypes.string,
  latest: PropTypes.object
};

export default memo(Publications);
