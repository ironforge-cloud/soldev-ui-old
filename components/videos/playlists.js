import {
  ChevronRightIcon,
  FolderIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import PropTypes from "prop-types";

export default function Playlists({ data }) {
  return (
    <>
      {/* Mobile */}
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-gray-500 dark:text-gray-300 text-xs font-medium uppercase tracking-wide">
            Playlists
          </h2>
        </div>
        <ul
          role="list"
          className="mt-3 border-t border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide:gray-600"
        >
          <>
            {data.map((playlist) => (
              <li key={playlist.ID}>
                <Link href={`/library/${playlist.ID}`} passHref>
                  <div className="flex items-center space-x-2 pl-2 h-12">
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="truncate hover:text-gray-600 dark:hover:text-gray-500  dark:text-gray-200 cursor-pointer text-sm">
                      {playlist.Title}{" "}
                      <span className="text-gray-500 dark:text-gray-500 font-normal">
                        by {playlist.Author}
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </>
        </ul>
      </div>

      {/* Tablet & Desktop */}
      <div className="hidden mt-1 sm:block overflow-hidden">
        <div className="align-middle inline-block min-w-full">
          <table className="min-w-full">
            <thead className="px-14">
              <tr className="border-t border-gray-200 dark:border-gray-400">
                <th className="px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <span className="lg:pl-2">Name</span>
                </th>

                <th className="hidden md:table-cell px-3 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Platform
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-600">
              {data.map((playlist) => (
                <tr key={playlist.ID}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                    <div className="flex items-center space-x-3 lg:pl-2 cursor-pointer">
                      <FolderIcon
                        className="h-8 w-8 text-gray-700 dark:text-gray-500"
                        aria-hidden="true"
                      />
                      <Link href={`/library/${playlist.ID}`} passHref>
                        <span className="truncate hover:text-gray-600 dark:text-gray-200 tracking-wide font-medium">
                          {playlist.Title}{" "}
                          <span className="text-gray-500 dark:text-gray-400 font-normal">
                            by {playlist.Author}
                          </span>
                        </span>
                      </Link>
                    </div>
                  </td>

                  <td className="hidden md:table-cell px-3 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    <div className="flex items-center space-x-2">
                      {playlist.Provider === "Youtube" && (
                        <VideoCameraIcon
                          className="h-6 w-6 text-red-500"
                          aria-hidden="true"
                        />
                      )}
                      {playlist.Provider === "Twitch" && (
                        <VideoCameraIcon
                          className="h-6 w-6 text-purple-500"
                          aria-hidden="true"
                        />
                      )}
                      <span className="text-gray-500 dark:text-gray-400 tracking-wide font-medium">
                        {playlist.Provider}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Playlists.propTypes = {
  data: PropTypes.array.isRequired,
};
