import { useState } from "react";
import fetch from "isomorphic-unfetch";

export default function SubmitForm() {
  const [authorName, setAuthorName] = useState("");
  const [title, setTitle] = useState("");
  const [contentUrl, setContentUrl] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/submit/content`, {
      method: "POST",
      body: JSON.stringify({
        Title: title,
        Description: description,
        Author: authorName,
        URL: contentUrl,
      }),
    });

    // Clean states
    setAuthorName("");
    setTitle("");
    setContentUrl("");
    setDescription("");
  };

  return (
    <div className="bg-white py-16 px-4 h-screen overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Submit new content
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Propose new content to the platform. Submissions will be manually
            reviewed before deciding to publish them to the site.
          </p>
        </div>
        <div className="mt-12">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            onSubmit={submitForm}
          >
            <div className="sm:col-span-2">
              <label
                htmlFor="author-name"
                className="block text-sm font-medium text-gray-700"
              >
                Author Name or Username
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
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title <span className="text-red-600">*</span>
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
            <div className="sm:col-span-2">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Content Url <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="url"
                  name="url"
                  required
                  type="url"
                  value={contentUrl}
                  onChange={(e) => setContentUrl(e.target.value)}
                  className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description <span className="text-red-600">*</span>
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
              </div>
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
