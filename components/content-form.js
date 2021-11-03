import { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
import Success from "./notifications/success";
import PropTypes from "prop-types";
import tagList from "../utils/tags";
import contentStatus from "../utils/content-status";
import verticals from "../utils/verticals";
import contentType from "../utils/content-types";

export default function ContentForm({ type, setOpen, data, setData }) {
  const createContent = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
    });
  };

  const updateContent = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: "PUT",
      body: JSON.stringify([
        { ...data, PK: `${data.Vertical}#${data.ContentType}` },
      ]),
    });
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
            {/* Title */}
            <div className="col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  value={data.Title}
                  onChange={(e) => setData({ ...data, Title: e.target.value })}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
            {/* Author*/}
            <div className="col-span-3">
              <label
                htmlFor="author-name"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="author-name"
                  id="author-name"
                  autoComplete="given-name"
                  value={data.Author}
                  onChange={(e) => setData({ ...data, Author: e.target.value })}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Name, Username or Social Platform link
              </p>
            </div>
            {/* Content Link */}
            <div className="col-span-6">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Content Link
              </label>

              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  URL
                </span>

                <input
                  id="url"
                  name="url"
                  required
                  type="url"
                  value={data.Url}
                  onChange={(e) => setData({ ...data, Url: e.target.value })}
                  className="py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>
            {/* Description */}
            <div className="col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  required
                  name="description"
                  rows={4}
                  value={data.Description}
                  onChange={(e) =>
                    setData({ ...data, Description: e.target.value })
                  }
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Brief description about the content. ~100 characters
                </p>
              </div>
            </div>

            {/* Content Status */}
            {type === "edit" && (
              <fieldset className="my-3 col-span-2">
                <div>
                  <legend className="text-base font-medium text-gray-900">
                    Content Status
                  </legend>
                  <p className="mt-1 text-sm text-gray-500">
                    Inactive content is not visible (soft-delete)
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  {contentStatus.map((status) => {
                    return (
                      <div key={status} className="flex items-center">
                        <input
                          id={status}
                          name="content-status"
                          type="radio"
                          value={status}
                          checked={data.ContentStatus === status}
                          onChange={(e) =>
                            setData({ ...data, ContentStatus: e.target.value })
                          }
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label
                          htmlFor={status}
                          className="ml-3 block text-sm font-medium text-gray-700 capitalize"
                        >
                          {status}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {/* Category */}
            <fieldset className="my-3 col-span-2">
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Category
                </legend>
              </div>
              <div className="mt-4 space-y-4">
                {verticals.map((vertical) => {
                  return (
                    <div key={vertical} className="flex items-center">
                      <input
                        id={vertical}
                        name="category"
                        type="radio"
                        value={vertical}
                        checked={data.Vertical === vertical}
                        onChange={(e) =>
                          setData({ ...data, Vertical: e.target.value })
                        }
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={vertical}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {vertical}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            {/* Content Type */}
            <fieldset className="my-3 col-span-2">
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Content Type
                </legend>
              </div>
              <div className="mt-4 space-y-4">
                {contentType.map((type) => {
                  return (
                    <div key={type} className="flex items-center">
                      <input
                        id={type}
                        name="content-type"
                        type="radio"
                        value={type}
                        checked={data.ContentType === type}
                        onChange={(e) =>
                          setData({ ...data, ContentType: e.target.value })
                        }
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={type}
                        className="ml-3 block text-sm font-medium text-gray-700 capitalize"
                      >
                        {type}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <div className="divide-y divide-gray-200 sm:space-y-2 col-span-6">
              <div>
                <h3 className="text-xl leading-6 font-medium text-gray-900">
                  Tags
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Tags improve content discovery
                </p>
              </div>
              <div></div>
            </div>

            {/* Level Tags */}
            <fieldset className="my-3 col-span-2">
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Level
                </legend>
              </div>
              <div className="mt-4 space-y-4">
                {tagList.level.map((tag) => {
                  return (
                    <div key={tag} className="flex items-center">
                      <input
                        id={tag}
                        name="levelTags"
                        type="radio"
                        value={tag}
                        checked={data.Tags.includes(tag)}
                        onClick={(e) => {
                          if (data.Tags.includes(e.target.value)) {
                            // If I click the selected element we need to deleted
                            const newTags = data.Tags.filter(
                              (item) => item !== e.target.value
                            );

                            setData({ ...data, Tags: newTags });
                          } else {
                            // If I click a new element we need to delete the selected
                            // and add the new element

                            // Delete the prev selected item in the category
                            let newTags = data.Tags;

                            // If
                            tagList.level.map((tag, index) => {
                              if (data.Tags.includes(tag)) {
                                newTags = data.Tags.splice(
                                  index,
                                  index,
                                  e.target.value
                                );
                              }
                            });

                            // Add new one
                            newTags.push(e.target.value);

                            setData({ ...data, Tags: newTags });
                          }
                        }}
                        onChange={() => {}}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={tag}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {tag}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            {/* Tech Tags */}
            <fieldset className="my-3 col-span-2">
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Tech
                </legend>
              </div>
              <div className="mt-4 space-y-4">
                {tagList.tech.map((tag) => {
                  return (
                    <div key={tag} className="flex items-center">
                      <input
                        id={tag}
                        name="techTags"
                        type="radio"
                        value={tag}
                        checked={data.Tags.includes(tag)}
                        onClick={() => {}}
                        onChange={() => {}}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={tag}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {tag}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            {/* Language Tags */}
            <fieldset className="my-3 col-span-2">
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Tech
                </legend>
              </div>
              <div className="mt-4 space-y-4">
                {tagList.language.map((tag) => {
                  return (
                    <div key={tag} className="flex items-center">
                      <input
                        id={tag}
                        name="languageTags"
                        type="radio"
                        value={tag}
                        checked={data.Tags.includes(tag)}
                        onClick={() => {}}
                        onChange={() => {}}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <label
                        htmlFor={tag}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {tag}
                      </label>
                    </div>
                  );
                })}
              </div>
            </fieldset>

            {/* Buttons */}
            <div className="flex max-w-3xl mx-auto justify-end">
              {type === "edit" && (
                <button
                  type="button"
                  className="bg-white py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-3 px-10 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setOpen(false)}
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

ContentForm.propTypes = {
  type: PropTypes.oneOf(["submit", "edit"]),
  setOpen: PropTypes.func,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};
