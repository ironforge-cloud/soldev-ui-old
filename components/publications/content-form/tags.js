import tagList from "../../../utils/tags";
import PropTypes from "prop-types";
import { memo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ContentTags({ data, setData, type }) {
  function tagsOnLick(e, array) {
    if (data.Tags.includes(e.target.value)) {
      // If I click the selected element we need to deleted
      const newTags = data.Tags.filter((item) => item !== e.target.value);

      setData({ ...data, Tags: newTags });
    } else {
      // If I click a new element we need to delete any element
      // from the same group type before adding a new one.

      let newTags = data.Tags;

      // Delete any prev selected item in the group
      for (let i = 0; i < array.length; i++) {
        // If the item doesn't exist we can continue
        if (!data.Tags.includes(array[i])) continue;

        // If the item exist we will delete it and finish our execution
        newTags = data.Tags.filter((item) => item !== array[i]);
        break;
      }

      // Add the new item
      newTags.push(e.target.value);

      setData({ ...data, Tags: newTags });
    }
  }

  function checkboxOnClick(value) {
    if (data.Tags.includes(value)) {
      // If I click the selected element we need to deleted
      const newTags = data.Tags.filter((item) => item !== value);

      setData({ ...data, Tags: newTags });
    } else {
      let newTags = data.Tags;
      // Add the new item
      newTags.push(value);

      setData({ ...data, Tags: newTags });
    }
  }

  return (
    <>
      <div className="divide-y divide-gray-200 sm:space-y-2 col-span-10">
        <div>
          <h3 className="text-xl leading-6 font-medium text-gray-900 dark:text-gray-200">
            Tags
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
            Tags will improve content discovery
          </p>
        </div>
        <div></div>
      </div>

      {/* Level Tags */}
      <fieldset className="col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
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
                  onChange={() => {}}
                  onClick={(e) => tagsOnLick(e, tagList.level)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 "
                />
                <label
                  htmlFor={tag}
                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Tech Tags */}
      <fieldset className="col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
            Industry
          </legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.industry.map((tag) => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="techTags"
                  type="checkbox"
                  checked={data.Tags.includes(tag)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={() => checkboxOnClick(tag)}
                />
                <label
                  htmlFor={tag}
                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Protocol Tags */}
      <fieldset className="my-3 col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
            Protocol
          </legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.protocols.map((tag) => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="languageTags"
                  type="checkbox"
                  checked={data.Tags.includes(tag)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={() => checkboxOnClick(tag)}
                />
                <label
                  htmlFor={tag}
                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Framework Tags */}
      <fieldset className="my-3 col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
            Framework
          </legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.framework.map((tag) => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="languageTags"
                  type="checkbox"
                  checked={data.Tags.includes(tag)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={() => checkboxOnClick(tag)}
                />
                <label
                  htmlFor={tag}
                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
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
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
            Language
          </legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.language.map((tag) => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="languageTags"
                  type="checkbox"
                  checked={data.Tags.includes(tag)}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  onChange={() => checkboxOnClick(tag)}
                />
                <label
                  htmlFor={tag}
                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </>
  );
}

ContentTags.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["submit", "edit"]),
};

export default memo(ContentTags);
