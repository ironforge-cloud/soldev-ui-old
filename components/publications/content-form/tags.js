import tagList from '../../../utils/tags';
import PropTypes from 'prop-types';
import { memo } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ContentTags({ data, setData, type }) {
  function tagsOnLick(e, array) {
    if (data.Tags.includes(e.target.value)) {
      // If I click the selected element we need to deleted
      const newTags = data.Tags.filter(item => item !== e.target.value);

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
        newTags = data.Tags.filter(item => item !== array[i]);
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
      const newTags = data.Tags.filter(item => item !== value);

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
      <div className="col-span-10 space-y-2 divide-y divide-gray-200 dark:divide-gray-600">
        <div>
          <h3 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-200">Tags</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tags will improve content discovery
          </p>
        </div>
        <div></div>
      </div>

      {/* Level Tags */}
      <fieldset className="col-span-5 md:col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">Level</legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.level.map(tag => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="levelTags"
                  type="radio"
                  value={tag}
                  checked={data.Tags.includes(tag)}
                  onChange={() => {}}
                  onClick={e => tagsOnLick(e, tagList.level)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label
                  htmlFor={tag}
                  className="block ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Tech Tags */}
      <fieldset className="col-span-5 md:col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
            Industry
          </legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.industry.map(tag => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="techTags"
                  type="checkbox"
                  checked={data.Tags.includes(tag)}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  onChange={() => checkboxOnClick(tag)}
                />
                <label
                  htmlFor={tag}
                  className="block ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Protocol Tags */}
      <fieldset className="col-span-5 my-3 md:col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
            Protocol
          </legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.protocols.map(tag => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="languageTags"
                  type="checkbox"
                  checked={data.Tags.includes(tag)}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  onChange={() => checkboxOnClick(tag)}
                />
                <label
                  htmlFor={tag}
                  className="block ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Framework Tags */}
      <fieldset className="col-span-5 my-3 md:col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
            Framework
          </legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.framework.map(tag => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="languageTags"
                  type="checkbox"
                  checked={data.Tags.includes(tag)}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  onChange={() => checkboxOnClick(tag)}
                />
                <label
                  htmlFor={tag}
                  className="block ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      {/* Language Tags */}
      <fieldset className="col-span-5 my-3 md:col-span-2">
        <div>
          <legend className="text-base font-medium text-gray-900 dark:text-gray-300">
            Language
          </legend>
        </div>
        <div className="mt-4 space-y-4">
          {tagList.language.map(tag => {
            return (
              <div key={tag} className="flex items-center">
                <input
                  id={tag}
                  name="languageTags"
                  type="checkbox"
                  checked={data.Tags.includes(tag)}
                  className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  onChange={() => checkboxOnClick(tag)}
                />
                <label
                  htmlFor={tag}
                  className="block ml-3 text-sm font-medium text-gray-700 dark:text-gray-300"
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
  type: PropTypes.oneOf(['submit', 'edit'])
};

export default memo(ContentTags);
