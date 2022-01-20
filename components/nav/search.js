import algoliasearch from "algoliasearch/lite";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import { memo, useMemo, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";
import PublicationsComponent from "../publications";
import PropTypes from "prop-types";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

function Search({ setSearch }) {
  const [autocompleteState, setAutocompleteState] = useState({});
  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state }) {
          setAutocompleteState(state);
          if (state.isOpen) {
            setSearch(true);
          } else {
            setSearch(false);
          }
        },
        placeholder: "Quick search...",
        getSources() {
          return [
            {
              sourceId: process.env.NEXT_PUBLIC_ALGOLIA_SOURCE_ID,
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: process.env.NEXT_PUBLIC_ALGOLIA_SOURCE_ID,
                      query,
                      params: {
                        hitsPerPage: 10,
                        highlightPreTag: "<mark>",
                        highlightPostTag: "</mark>",
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return item.url;
              },
            },
          ];
        },
      }),
    [setSearch]
  );

  return (
    <Popover
      className="min-w-0 max-w-xl flex-1"
      {...autocomplete.getRootProps({})}
    >
      {({ open }) => (
        <>
          {/* Search Bar*/}
          <div className="flex items-center px-2 sm:px-6 py-3 xl:px-0">
            <div className="w-full">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <SearchIcon
                    className="h-6 w-6 text-gray-700 dark:text-stone-200"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-1 flex items-center">
                  <input
                    className="block w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-stone-700 rounded-md py-3 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-stone-300 focus:outline-none text-gray-900 dark:text-stone-300 focus:ring-1 focus:ring-rose-500 focus:border-rose-500"
                    {...autocomplete.getInputProps({})}
                  />
                  {/* TODO: Add keyboard shortcut */}
                  {/*<div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">*/}
                  {/*  <kbd className="inline-flex items-center border border-gray-200 dark:border-stone-600 rounded px-2 text-sm font-sans font-medium text-gray-400 dark:text-stone-500">*/}
                  {/*    ⌘K*/}
                  {/*  </kbd>*/}
                  {/*</div>*/}
                </div>
              </div>
            </div>
          </div>
          {autocompleteState.isOpen && (
            <Popover.Panel
              static
              className="absolute inset-x-0 lg:left-[250px] min-h-full"
              {...autocomplete.getPanelProps({})}
            >
              {/* Results*/}
              {Array.isArray(autocompleteState.collections) &&
                autocompleteState.collections.map((collection, index) => {
                  const { source, items } = collection;
                  return (
                    <div key={`source-${index}`}>
                      {items.length > 0 && (
                        <div
                          className="mt-10 pb-10"
                          {...autocomplete.getListProps()}
                        >
                          <PublicationsComponent
                            data={items}
                            title="Search Results"
                            isLoading={false}
                            closeSearch={autocomplete.setIsOpen}
                            cardMode="search"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </Popover.Panel>
          )}
        </>
      )}
    </Popover>
  );
}

Search.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default memo(Search);
