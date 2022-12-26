import PropTypes from 'prop-types';
import { memo } from 'react';
import router from 'next/router';
import listOfTags from '../../utils/tags';

// There are 4 variables with confusing names in this component. Amazing.
// - listOfTags: all possible tags
// - tagsList: tags in the displayed content
// - tags: tags in the url
// - badges: more tags in the url

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// This component "state" is managed by the data stored in the URL
function TagsSelector({ tagsList, contentType, tags, badges }) {
  const selectedTags = tags.concat(badges);

  function onClick(tag) {
    let newTags = selectedTags;

    // If the clicked tag was already selected
    if (selectedTags.includes(tag)) {
      // remove tag
      newTags = newTags.filter((value) => value !== tag);
    } else {
      // If the clicked tag was no selected yet
      // add tag
      newTags.push(tag);
    }

    // url composition
    let url = `/library/${contentType}/filter?`;
    newTags.forEach((item) => {
      if (listOfTags.badge.includes(item)) {
        url = url + `badge=${item}&`;
      } else {
        url = url + `tag=${item}&`;
      }
    });

    // url cleaning
    url = url.slice(0, -1);

    // redirect
    router.push(url);
  }

  return (
    <div className="flex gap-2 flex-wrap justify-center max-w-sm sm:max-w-lg lg:max-w-xl xl:max-w-3xl 3xl:max-w-full">
      {tagsList.map((tag) => {
        return (
          <button
            key={tag}
            onClick={() => onClick(tag)}
            className={classNames(
              selectedTags.includes(tag)
                ? 'bg-green-500 dark:bg-green-800 dark:text-gray-200 shadow'
                : 'bg-gray-400 dark:bg-gray-700',
              'inline-flex items-center px-4 py-1 rounded-lg text-sm text-white dark:text-gray-300 font-medium transition transform-gpu duration-150 ease-in-out hover:-translate-y-0.5 hover:scale-105 cursor-pointer hover:bg-opacity-80 hover:shadow'
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

TagsSelector.propTypes = {
  tagsList: PropTypes.array.isRequired,
  contentType: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  badges: PropTypes.array.isRequired,
};

export default memo(TagsSelector);
