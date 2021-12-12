import Card from "./card";
import SubmitContentCard from "./submit-content-card";
import { useState, memo } from "react";
import { useAppState } from "../../context/AppContext";
import CardEdit from "./card-edit";
import NotificationSuccess from "../notifications/success";
import PropTypes from "prop-types";
import Spinner from "../spinner";
import VideoCard from "./video-card";
import findTags from "../../utils/find-tags";
import TagsSelector from "../badges/tags-selector";

function Publications({ data, type, isLoading, badges, tags }) {
  const [open, setOpen] = useState(false);
  const appState = useAppState();
  const [content, setContent] = useState({});
  const [notifySuccess, setNotifySuccess] = useState(false);

  const editContent = (data) => {
    setContent(data);
    setOpen(true);
  };

  const tagsList = findTags(data);

  return (
    <div className="relative flex flex-col mx-auto">
      <div className="flex justify-center">
        <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 capitalize w-max">
          {type === "sdk" ? "SDKs & Frameworks" : type}
        </h2>
      </div>

      {tags && (
        <div className="mt-8 flex justify-center">
          <TagsSelector
            tagsList={tagsList}
            contentType={type}
            badges={badges}
            tags={tags}
          />
        </div>
      )}

      <div className="flex flex-wrap justify-around py-4 px-2 md:px-6 3xl:justify-center place-content-start space-x-6 gap-5 xl:gap-10">
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
      />
      <NotificationSuccess
        show={notifySuccess}
        setShow={setNotifySuccess}
        text="Successfully updated!"
        subText="Changes can take up to 1 minute to be reflected in the UI"
      />
    </div>
  );
}

Publications.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  badges: PropTypes.array,
  tags: PropTypes.array,
};

export default memo(Publications);
