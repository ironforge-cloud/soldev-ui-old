import algoliasearch from "algoliasearch/lite";
import { createAutocomplete } from "@algolia/autocomplete-core";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import { memo, useMemo, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";
import Link from "next/link";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

function Search() {
  const [autocompleteState, setAutocompleteState] = useState({});
  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        placeholder: "Quick search...",
        getSources() {
          return [
            {
              sourceId: "dev_soldev",
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: "dev_soldev",
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
    []
  );

  return (
    <Popover
      className="min-w-0 max-w-xl flex-1 relative"
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
                    id="search"
                    name="search"
                    className="block w-full bg-white dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md py-3 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                    type="search"
                    {...autocomplete.getInputProps({})}
                  />
                  <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd className="inline-flex items-center border border-gray-200 dark:border-stone-600 rounded px-2 text-sm font-sans font-medium text-gray-400 dark:text-stone-500">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {autocompleteState.isOpen && (
            <Popover.Panel
              static
              className="min-h-fit w-screen sm:w-fit absolute z-10 bg-white dark:bg-stone-800 border border-gray-300 dark:border-stone-700 rounded-md py-3 text-sm"
              {...autocomplete.getPanelProps({})}
            >
              {/* Results*/}
              {Array.isArray(autocompleteState.collections) &&
                autocompleteState.collections.map((collection, index) => {
                  const { source, items } = collection;
                  return (
                    <div key={`source-${index}`}>
                      {items.length > 0 && (
                        <div {...autocomplete.getListProps()}>
                          {items.map((item) => (
                            <Link
                              key={item.objectID}
                              href={`localhost:300/library/${item.ContentType}/${item.SK}`}
                              passHref
                            >
                              <div
                                {...autocomplete.getItemProps({
                                  item,
                                  source,
                                })}
                                className="m-2 p-2 hover:bg-sky-100 rounded-lg"
                              >
                                {/*  Title */}
                                <a
                                  href={item.Url}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  <p className="text-lg font-semibold text-gray-900 dark:text-stone-200 hover:text-sky-500 dark:hover:text-sky-600">
                                    {item.Title}
                                  </p>
                                </a>

                                {/*  Author */}
                                <div className="mb-2">
                                  {item.Author && (
                                    <a
                                      href={item.Url}
                                      className=""
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      <p className="text-xs uppercase font-semibold tracking-wide text-gray-500 dark:text-stone-500">
                                        by {item.Author}
                                      </p>
                                    </a>
                                  )}
                                </div>

                                {/*Tags*/}
                                {Array.isArray(item.Tags) && (
                                  <div className="mb-1 mt-2 text-sky-500 dark:text-sky-600 cursor-pointer">
                                    {item.Tags.map((tag, index) => (
                                      <Link
                                        key={tag}
                                        href={`/library/${item.ContentType}/filter/?tag=${tag}`}
                                        passHref
                                      >
                                        <span>
                                          <span className="hover:underline decoration-rose-500 lowercase">
                                            #{tag}
                                          </span>
                                          <span>
                                            {index < item.Tags.length - 1 && (
                                              <>{", "}</>
                                            )}
                                          </span>
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                )}

                                {/*  Description */}
                                <div className="flex-1 text-ellipsis overflow-hidden prose">
                                  <p className="text-gray-600 dark:text-stone-400">
                                    {item.Description}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
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

export default memo(Search);
