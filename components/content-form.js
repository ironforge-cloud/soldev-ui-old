import { useState } from "react";
import fetch from "isomorphic-unfetch";
import Success from "./notifications/success";
import PropTypes from "prop-types";
import TagList from "../utils/tags";

export default function ContentForm({ type, setOpen }) {
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [contentUrl, setContentUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Solana");

  const submitForm = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/submit/content`, {
      method: "POST",
      body: JSON.stringify({
        Title: title,
        Description: description,
        Author: authorName,
        URL: contentUrl,
        Category: category,
      }),
    });

    // Clean states
    setAuthorName("");
    setTitle("");
    setContentUrl("");
    setDescription("");
    setCategory("Solana");
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
            className="grid grid-cols-4 gap-y-6 gap-x-8"
            onSubmit={submitForm}
          >
            {/* Title */}
            <div className="col-span-4">
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>

            {/* Category */}
            <fieldset className="my-3 col-span-1">
              <div>
                <legend className="text-base font-medium text-gray-900">
                  Category
                </legend>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="solana"
                    name="category"
                    type="radio"
                    required
                    value="Solana"
                    onClick={() => setCategory("Solana")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="solana"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Solana
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="rust"
                    name="category"
                    type="radio"
                    value="Rust"
                    onClick={() => setCategory("Rust")}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="rust"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Rust
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Tags */}
            {/*<fieldset className="my-3 col-span-3">*/}
            {/*  <legend className="text-base font-medium text-gray-900">*/}
            {/*    Tags*/}
            {/*  </legend>*/}
            {/*  <div className="mt-4 space-y-4">*/}
            {/*    {TagList.map((tag) => (*/}
            {/*      <div className="flex items-start">*/}
            {/*        <div className="flex items-center h-5">*/}
            {/*          <input*/}
            {/*            id="comments"*/}
            {/*            name="comments"*/}
            {/*            type="checkbox"*/}
            {/*            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"*/}
            {/*          />*/}
            {/*        </div>*/}
            {/*        <div className="ml-3 text-sm">*/}
            {/*          <label*/}
            {/*            htmlFor="comments"*/}
            {/*            className="font-medium text-gray-700 capitalize"*/}
            {/*          >*/}
            {/*            {tag.name}*/}
            {/*          </label>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*</fieldset>*/}

            {/* Content Link */}
            <div className="col-span-4">
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
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  className="py-3 px-4 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="https://www.example.com"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-4">
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                />
                <p className="mt-2 text-sm text-gray-500">
                  Brief description about the content. ~100 characters
                </p>
              </div>
            </div>

            {/* Author*/}
            <div className="col-span-4">
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
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex max-w-3xl mx-auto justify-end">
              <button
                type="button"
                className="bg-white py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
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

ContentForm.propTypes = {
  type: PropTypes.oneOf(["submit", "edit"]),
  setOpen: PropTypes.func.isRequired,
};
