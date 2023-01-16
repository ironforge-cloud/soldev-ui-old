import { SearchIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { memo } from 'react';

function Searchbar({ searchValue, setSearchValue }) {
  return (
    /* Search Bar*/
    <div className="flex items-center px-2 py-3 sm:px-6 xl:px-0">
      <div className="w-full">
        <label htmlFor="search" className="sr-only">
          Search
        </label>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" aria-hidden="true" />
          </div>
          <div className="mt-1 flex items-center">
            <input
              className="text-md block w-full rounded-md border border-gray-200 bg-white py-3
              pl-10 pr-3 text-center text-gray-900 placeholder-gray-500 shadow-lg
              focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500
              dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-300"
              placeholder="Search programs by name or address"
              onChange={e => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Searchbar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired
};

export default memo(Searchbar);
