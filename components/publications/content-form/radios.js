import PropTypes from "prop-types";
import { memo } from "react";
import contentStatus from "../../../utils/content-status";
import contentType from "../../../utils/content-types";
import tagList from "../../../utils/tags";

function Radios({ data, setData, type }) {
  return (
    <>
      {/* Badge */}
      {type === "edit" && (
        <fieldset className="my-3 col-span-2">
          <div>
            <legend className="text-base font-medium text-gray-900 dark:text-stone-400">
              Badge
            </legend>
          </div>
          <div className="mt-4 space-y-4">
            {tagList.badge.map((tag) => {
              return (
                <div key={tag} className="flex items-center">
                  <input
                    id={tag}
                    name="badge"
                    type="radio"
                    value={tag}
                    checked={data.SpecialTag === tag}
                    onClick={(e) => {
                      if (data.SpecialTag === tag) {
                        setData({ ...data, SpecialTag: "" });
                      } else {
                        setData({ ...data, SpecialTag: e.target.value });
                      }
                    }}
                    onChange={() => {}}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor={tag}
                    className="ml-3 block text-sm font-medium text-gray-700 dark:text-stone-400"
                  >
                    {tag}
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Content Type */}
      <fieldset className="my-3 col-span-3">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-stone-400">
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
                  required
                  value={type}
                  checked={data.ContentType === type}
                  onChange={(e) =>
                    setData({ ...data, ContentType: e.target.value })
                  }
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label
                  htmlFor={type}
                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-stone-400 capitalize"
                >
                  {type}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </>
  );
}

Radios.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["submit", "edit"]),
};

export default memo(Radios);
