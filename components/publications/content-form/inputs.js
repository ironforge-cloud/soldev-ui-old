import PropTypes from "prop-types";
import { memo } from "react";

function Inputs({ data, setData, type }) {
  return (
    <>
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
            required={type === "submit"}
            name="description"
            rows={4}
            value={data.Description}
            onChange={(e) => setData({ ...data, Description: e.target.value })}
            className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
          />
          <p className="mt-2 text-sm text-gray-500">
            Brief description about the content. ~100 characters
          </p>
        </div>
      </div>
    </>
  );
}

Inputs.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["submit", "edit"]),
};

export default memo(Inputs);
