import PropTypes from "prop-types";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default function Playlists({ playlists }) {
  return (
    <>
      {/* Mobile */}
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Playlists
          </h2>
        </div>
        <ul
          role="list"
          className="mt-3 border-t border-gray-200 divide-y divide-gray-100"
        >
          {playlists.map((playlist) => (
            <li key={playlist.ID}>
              <a
                href="#"
                className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
              >
                <span className="flex items-center truncate space-x-3">
                  <FontAwesomeIcon icon={["fas", "folder"]} size="1x" />
                  <span className="font-medium truncate text-sm leading-6">
                    {playlist.Title}{" "}
                    <span className="truncate font-normal text-gray-500">
                      by {playlist.Creator}
                    </span>
                  </span>
                </span>
                <ChevronRightIcon
                  className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Tablet & Desktop */}
      <div className="hidden mt-5 sm:block">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead className="px-14">
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Playlist</span>
                </th>

                <th className="hidden md:table-cell px-3 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="hidden md:table-cell px-3 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pr-3">Last Updated</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {playlists.map((playlist) => (
                <tr key={playlist.ID}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <FontAwesomeIcon icon={["fas", "folder"]} size="2x" />
                      <Link
                        href={`/library/videos/playlist/${playlist.ID}`}
                        passHref
                      >
                        <span className="truncate hover:text-gray-600 cursor-pointer">
                          {playlist.Title}{" "}
                          <span className="text-gray-500 font-normal">
                            by {playlist.Creator}
                          </span>
                        </span>
                      </Link>
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-3 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    <div className="flex justify-end items-center space-x-2">
                      {playlist.Provider === "Youtube" && (
                        <FontAwesomeIcon
                          icon={["fab", "youtube"]}
                          size="2x"
                          color="red"
                        />
                      )}
                      <span></span>
                      {playlist.Provider}
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                    <span className="lg:pr-3">
                      {/* TODO: Fix LastUpdated */}
                      {/* {playlist.LastUpdated} */}
                      Oct 3, 2021
                    </span>
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
  playlists: PropTypes.array.isRequired,
};
