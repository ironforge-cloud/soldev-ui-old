import Card from "./card";
import SubmitContentCard from "./submit-content-card";
import { useState } from "react";
import { useAppState } from "../../context/AppContext";
import CardEdit from "./card-edit";
import NotificationSuccess from "../notifications/success";
import CardPlaceholder from "./card-placeholder";
import PropTypes from "prop-types";

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
    <div className="relative flex flex-col mx-auto">
      <div className="pt-7 pb-2 flex justify-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 capitalize w-max p-3">
          {type === "sdk" ? "SDK & Frameworks" : type}
        </h2>
      </div>
      <div className="flex flex-wrap justify-around 3xl:justify-center place-content-start p-2">
        <SubmitContentCard />
        {isLoading && <CardPlaceholder />}
        {data.map((content) => (
          <div key={content.SK} className="px-1 3xl:p-8 pb-7 mt-2">
            {appState.editMode ? (
              <div
                className="cursor-pointer"
                onClick={() => editContent(content)}
              >
                <Card content={content} editMode />
              </div>
            ) : (
              <a
                href={content.Url}
                className=""
                rel="noreferrer"
                target="_blank"
              >
                <Card content={content} />
              </a>
            )}
          </div>
        ))}
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
