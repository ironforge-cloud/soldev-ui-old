import Card from "./card";
import { memo, useEffect, useState } from "react";
import { useAppState } from "../../context/AppContext";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";

const VideoCard = dynamic(() => import("./video-card"));
const TagsSelector = dynamic(() => import("../badges/tags-selector"));
const Spinner = dynamic(() => import("../spinner"));
const CardEdit = dynamic(() => import("./card-edit"));
const SubmitContentCard = dynamic(() => import("./submit-content-card"));

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

  const editContent = (data) => {
    setContent(data);
    setOpen(true);
  };

  return (
    <div className="flex flex-col mx-auto">
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-stone-200 capitalize w-max">
          {title}
        </h2>
      </div>

      {tags && (
        <div className="flex justify-center">
          <TagsSelector
            tagsList={tagsList}
            contentType={contentType}
            badges={badges}
            tags={tags}
          />
        </div>
      )}

      <div className="flex flex-wrap justify-center mt-1 py-4 px-2 md:px-6 place-content-start md:space-x-6 gap-5 xl:gap-10">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="md:ml-6 hidden lg:block">
              <SubmitContentCard />
            </div>

            {data.map((content) => {
              //  Initial Tags for content type "Playlists" is null
              if (!content.Tags) content.Tags = [];

              // Everything else except playlist content
              if (content.ContentType !== "Playlist") {
                return (
                  <Card
                    key={content.SK}
                    content={content}
                    mode={
                      appState.editMode && cardMode !== "search"
                        ? "edit"
                        : cardMode
                    }
                    editContent={editContent}
                    closeSearch={closeSearch}
                  />
                );
              }

              // Playlist Content
              return (
                <div key={content.SK}>
                  <VideoCard content={content} closeSearch={closeSearch} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <CardEdit
        open={open}
        setOpen={setOpen}
        content={content}
        positions={positions}
      />
    </div>
  );
}

Publications.defaultProps = {
  tags: [],
  badges: [],
  tagsList: [],
  title: "",
  contentType: "",
  cardMode: "",
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
};

export default memo(Publications);
