import PropTypes from 'prop-types';
import { memo } from 'react';

function TableHeader({ title, subTitle }) {
  return (
    <div>
      <div className="text-gray-9 flex justify-between border border-gray-300 bg-gray-200 py-3 px-4 font-medium tracking-wide dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
        <span>{title}</span>

        <span>{subTitle}</span>
      </div>
    </div>
  );
}

TableHeader.propType = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
};

export default memo(TableHeader);
