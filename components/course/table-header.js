import PropTypes from 'prop-types';
import { memo } from 'react';

function TableHeader({ title, subTitle, ready }) {
  return (
    <div className="text-gray-9 flex items-center justify-between space-x-1 border border-gray-300 bg-gray-200 py-3 px-4 font-medium tracking-wide dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
      <span>
        {title}

        {!ready && (
          <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800 dark:bg-red-500 dark:text-red-50">
            Coming soon
          </span>
        )}
      </span>

      <span className="whitespace-nowrap">{subTitle}</span>
    </div>
  );
}

TableHeader.propType = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  ready: PropTypes.bool
};

export default memo(TableHeader);
