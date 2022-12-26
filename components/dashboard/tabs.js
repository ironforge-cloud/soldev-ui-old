import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loadContent from '../../utils/load-content';

export default function Tabs({ newContent }) {
  const [contentAmount, setContentAmount] = useState(10);

  function loadMoreContent(content, contentAmount, setContentAmount) {
    if (Array.isArray(content) && content.length > 0) {
      return (
        <div className="flex flex-col gap-5 pb-5">
          {loadContent(content, contentAmount)}

          {contentAmount < content.length && (
            <button
              onClick={() => setContentAmount((contentAmount += 5))}
              className="block w-full rounded-lg bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-lg hover:bg-opacity-80 hover:opacity-95 hover:shadow-sky-500/30 dark:bg-gray-800 dark:text-gray-300 dark:hover:shadow-sky-400/20"
            >
              View More
            </button>
          )}
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col justify-between gap-5">
      {loadMoreContent(newContent, contentAmount, setContentAmount)}
    </div>
  );
}

Tabs.propTypes = {
  newContent: PropTypes.array.isRequired
};
