import Card from "./card";
import SubmitContentCard from "./submit-content-card";
import { useState } from "react";
import { useAppState } from "../../context/AppContext";
import CardEdit from "./card-edit";
import NotificationSuccess from "../notifications/success";
import PropTypes from "prop-types";
import Spinner from "../spinner";

export default function Publications({ data, type, isLoading }) {
  const [open, setOpen] = useState(false);
  const appState = useAppState();
  const [content, setContent] = useState({});
  const [notifySuccess, setNotifySuccess] = useState(false);

  const editContent = (data) => {
    setContent(data);
    setOpen(true);
  };

  return (
    <div className="relative flex flex-col mx-auto pb-16">
      <div className="pt-7 pb-2 flex justify-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 capitalize w-max p-3">
          {type}
        </h2>
      </div>

      <div className="flex flex-wrap  p-2 justify-around 3xl:justify-center place-content-start space-x-6 3xl:space-x-8 space-y-10">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="mt-10 ml-8">
              <SubmitContentCard />
            </div>

            {data.map((content) => {
              //  Initial Tags for content type "Playlists" is null
              if (!content.Tags) content.Tags = [];
              return (
                <div key={content.SK}>
                  <Card
                    content={content}
                    mode={appState.editMode ? "edit" : ""}
                    editContent={editContent}
                  />
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
};
