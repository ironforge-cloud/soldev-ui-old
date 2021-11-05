import tagList from "../../../utils/tags";
import PropTypes from "prop-types";
import { memo } from "react";

function ContentTags({ data, setData }) {
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

  return (
    <>
      <div className="divide-y divide-gray-200 sm:space-y-2 col-span-6">
        <div>
          <h3 className="text-xl leading-6 font-medium text-gray-900">Tags</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Tags improve content discovery
          </p>
        </div>
        <div></div>
      </div>

      {/* Level Tags */}
      <fieldset className="my-3 col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900">Level</legend>
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
                  onClick={(e) => tagsOnLick(e, tagList.level)}
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
          <legend className="text-base font-medium text-gray-900">Tech</legend>
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
                  onClick={(e) => tagsOnLick(e, tagList.tech)}
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
                  type="radio"
                  value={tag}
                  checked={data.Tags.includes(tag)}
                  onClick={(e) => tagsOnLick(e, tagList.language)}
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
    </>
  );
}

ContentTags.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};

export default memo(ContentTags);
