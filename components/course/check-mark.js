import { CheckIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';

function CheckMark({ item }) {
  const [checkMarkHover, setCheckMarkHover] = useState(false);
  const [checkMark, setCheckMark] = useState(false);

  useEffect(() => {
    if (window) {
      let savedCourseState = window.localStorage.getItem('course');
      try {
        savedCourseState = JSON.parse(savedCourseState);

        if (savedCourseState === null) savedCourseState = {};

        if (savedCourseState.hasOwnProperty(item) && savedCourseState[item]) setCheckMark(true);
      } catch (error) {
        console.error(error);
      }
    }
  }, [item]);

  const saveCheckMarkState = () => {
    const key = item;

    if (window) {
      let savedCourseState = window.localStorage.getItem('course');
      savedCourseState = JSON.parse(savedCourseState);

      if (savedCourseState === null) savedCourseState = {};

      // Save state for later using LocalStorage
      savedCourseState[key] = !checkMark;
      window.localStorage.setItem('course', JSON.stringify(savedCourseState));

      setCheckMark(!checkMark);
    }
  };

  return (
    <button
      type="button"
      className="mr-5 inline-flex items-center rounded-full border border-transparent border-gray-300 bg-gray-200 p-2 text-gray-700 shadow-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
      onClick={() => saveCheckMarkState()}
      onMouseLeave={() => setCheckMarkHover(false)}
      onMouseEnter={() => setCheckMarkHover(true)}
    >
      {checkMarkHover || checkMark ? (
        <CheckIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <div className="h-6 w-6" onMouseEnter={() => setCheckMarkHover(true)} />
      )}
    </button>
  );
}

CheckMark.propType = {
  item: PropTypes.string.isRequired
};

export default memo(CheckMark);
