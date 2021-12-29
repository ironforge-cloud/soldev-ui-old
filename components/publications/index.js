import Card from "./card";
import SubmitContentCard from "./submit-content-card";
import { useState, memo, useEffect } from "react";
import { useAppState } from "../../context/AppContext";
import CardEdit from "./card-edit";
import NotificationSuccess from "../notifications/success";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import VideoCard from "./video-card";
import findTags from "../../utils/find-tags";
import TagsSelector from "../badges/tags-selector";

function Publications({ data, title, isLoading, badges, tags }) {
  const [open, setOpen] = useState(false);
  const appState = useAppState();
  const [content, setContent] = useState({});
  const [notifySuccess, setNotifySuccess] = useState(false);
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

  const tagsList = findTags(data);

  let componentTitle = title;

  if (title === "sdk") {
    componentTitle = "SDKs & Frameworks";
  } else if (title === "threads") {
    componentTitle = "Twitter Threads";
  } else if (title === "spl") {
    componentTitle = "Program Library";
  } else if (title === "started") {
    componentTitle = "Getting Started with Solana";
  }

  return (
    <div className="relative flex flex-col mx-auto">
      <div className="flex justify-center mb-8">
        <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-stone-200 capitalize w-max">
          {componentTitle}
        </h2>
      </div>

      {tags && (
        <div className="flex justify-center">
          <TagsSelector
            tagsList={tagsList}
            contentType={title}
            badges={badges}
            tags={tags}
          />
        </div>
      )}

      <div className="flex flex-wrap justify-center mt-1 py-4 px-2 md:px-6 place-content-start space-x-6 gap-5 xl:gap-10">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {/*  Don't render the submit content card if Playlist*/}
            <div className="ml-6 hidden lg:block">
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
                    mode={appState.editMode ? "edit" : ""}
                    editContent={editContent}
                  />
                );
              }

              // Playlist Content
              return (
                <div key={content.SK}>
                  <VideoCard content={content} />
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
        setNotifySuccess={setNotifySuccess}
        positions={positions}
      />
      <NotificationSuccess
        show={notifySuccess}
        setShow={setNotifySuccess}
        text="Successfully updated!"
        subText="Refresh the page if you want to see changes immediately"
      />
    </div>
  );
}

Publications.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  badges: PropTypes.array,
  tags: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default memo(Publications);
