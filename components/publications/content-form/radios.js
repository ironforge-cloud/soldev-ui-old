import PropTypes from "prop-types";
import { memo } from "react";
import contentStatus from "../../../utils/content-status";
import verticals from "../../../utils/verticals";
import contentType from "../../../utils/content-types";

function Radios({ data, setData, type }) {
  return (
    <>
      {/* Content Status */}
      {type === "edit" && (
        <fieldset className="my-3 col-span-3">
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

      {/* Content Type */}
      <fieldset className="my-3 col-span-3">
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
                  className="ml-3 block text-sm font-medium text-gray-700 capitalize"
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
