import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import ContentTags from "./tags";
import { memo } from "react";
import Radios from "./radios";
import Inputs from "./inputs";

function ContentForm({ type, setOpen, data, setData, setNotifySuccess }) {
  const createContent = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
    });

    // After submitting we need to restart the
    // component state
    setData({
      Title: "",
      Author: "",
      Description: "",
      Url: "",
      Vertical: "Solana",
      Tags: [],
      ContentType: "",
    });

    // Send success notification
    setNotifySuccess(true);
  };

  const updateContent = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: "PUT",
      body: JSON.stringify([{ ...data }]),
    });

    // Edit happens inside a modal, we need to close it after
    setOpen(false);

    // Send success notification
    setNotifySuccess(true);
  };

  return (
    <div className="bg-white py-16 px-4 h-full overflow-hidden sm:px-6 lg:px-8 lg:py-14">
      <div className="relative max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {type === "submit" ? "Submit new content" : "Edit Content"}
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            {type === "submit"
              ? `Propose new content to the platform. Submissions will be manually
                            reviewed before deciding to publish them to the site.`
              : ""}
          </p>
        </div>
        <div className="mt-12">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-6 gap-y-6 gap-x-8"
            onSubmit={type === "edit" ? updateContent : createContent}
          >
            {/*Inputs*/}
            <Inputs data={data} setData={setData} type={type} />

            {/*Radios components*/}
            <Radios data={data} setData={setData} type={type} />

            {/* Tags */}
            <ContentTags data={data} setData={setData} />

            {/* Buttons */}
            <div className="flex max-w-3xl mx-auto justify-end">
              {type === "edit" && (
                <button
                  type="button"
                  className="bg-white py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    if (type === "edit") setOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {type === "submit" ? "Submit" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo(ContentForm);

ContentForm.propTypes = {
  type: PropTypes.oneOf(["submit", "edit"]),
  setOpen: PropTypes.func,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  setNotifySuccess: PropTypes.func.isRequired,
};
