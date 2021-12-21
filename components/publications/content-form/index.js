import fetch from "isomorphic-unfetch";
import PropTypes from "prop-types";
import ContentTags from "./tags";
import { memo, useState } from "react";
import Radios from "./radios";
import Inputs from "./inputs";
import Status from "./status";
import Position from "./position";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ContentForm({
  type,
  setOpen,
  data,
  setData,
  setNotifySuccess,
  positions,
}) {
  const [contentExist, setContentExist] = useState(false);

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
      SpecialTag: "New",
      Position: 0,
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
    <div className="relative bg-white dark:bg-stone-800 py-16 px-4 h-full overflow-hidden sm:px-6 lg:px-8 lg:py-14">
      <div className=" max-w-3xl mx-auto">
        <div className="absolute top-0 right-1">
          {type === "edit" && (
            <Position data={data} setData={setData} list={positions} />
          )}
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-stone-200 sm:text-4xl">
            {type === "submit" ? "Submit new content" : "Edit Content"}
          </h2>

          <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-stone-300">
            {type === "submit" &&
              `Propose new content to the platform. Submissions will be manually
                            reviewed before deciding to publish them to the site.`}
          </p>
          {type === "edit" && <Status data={data} setData={setData} />}
        </div>

        <div className="mt-12">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-8 gap-y-6 gap-x-8"
            onSubmit={type === "edit" ? updateContent : createContent}
          >
            {/*Inputs*/}
            <Inputs
              data={data}
              setData={setData}
              type={type}
              contentExist={contentExist}
              setContentExist={setContentExist}
            />

            {/*Radios components*/}
            <Radios data={data} setData={setData} type={type} />

            {/* Tags */}
            <ContentTags data={data} setData={setData} type={type} />

            {/* Buttons */}
            <div className="flex max-w-3xl mx-auto justify-end">
              {type === "edit" && (
                <button
                  type="button"
                  className="bg-white dark:bg-stone-700 py-3 px-6 border border-gray-300 dark:border-stone-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-stone-300 hover:bg-gray-50 dark:hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    if (type === "edit") setOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={contentExist}
                className={classNames(
                  "ml-3 inline-flex justify-center py-3 px-16 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 dark:text-stone-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                  contentExist && "disabled:opacity-50"
                )}
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
  positions: PropTypes.array,
};
