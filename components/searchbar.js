import { SearchIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';
import { memo, useCallback, useEffect, useState } from 'react';
import router from 'next/router';

function Searchbar({ searchButton, keyboardShortcut }) {

  // handle what happens on key press
  const handleKeyPress = useCallback(event => {
    if (keyboardShortcut && event.metaKey && event.which === 75) {
      document.getElementById('search_input').focus();
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const [query, setQuery] = useState('');
  const setSearch = () => {
    if (query) {
      router.push(`/registry/${query}`).then();
    } else {
      document.getElementById('search_input').focus();
    }
  };

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
              className="text-md block w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-3 text-center text-gray-900 placeholder-gray-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-300"
              placeholder="Search programs or apps"
              id="search_input"
              onChange={e => setQuery(e.target.value)}
            />
            {/* TODO: handle address and shortcut key colliding in small screens */}
            {keyboardShortcut ? (
              <div className="absolute right-0 flex hidden py-1.5 pr-1.5 sm:block">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400 dark:border-gray-600 dark:text-gray-500">
                  ⌘K
                </kbd>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {
        /* extra search button */
        searchButton ? (
          <button
            type="button"
            className="mx-2 mt-1 inline-flex items-center rounded-lg border border-transparent bg-blue-400 py-2.5 px-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={setSearch}
          >
            Search
          </button>
        ) : null
      }
    </div>
  );
}

Searchbar.propTypes = {
  keyboardShortcut: PropTypes.bool.isRequired
};

export default memo(Searchbar);
