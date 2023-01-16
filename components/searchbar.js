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
              className="text-md block w-full rounded-md border border-gray-300 bg-white py-3
              pl-10 pr-3 text-center text-gray-900 placeholder-gray-500 focus:border-sky-500
              focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-700
              dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-300"
              placeholder="Search programs by name or address"
              onChange={e => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </div>
        </div>
      </div>

      {/*<button*/}
      {/*  type="button"*/}
      {/*  className="mx-2 mt-1 inline-flex w-40 items-center rounded-md border border-transparent bg-indigo-600 py-2.5 px-3*/}
      {/*      text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500*/}
      {/*      focus:ring-offset-2 dark:text-gray-200 dark:focus:ring-blue-800"*/}
      {/*  onClick={setSearch}*/}
      {/*>*/}
      {/*  Search*/}
      {/*</button>*/}
    </div>
  );
}

Searchbar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired
};

export default memo(Searchbar);
