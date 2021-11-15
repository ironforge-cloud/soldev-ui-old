import { ChevronRightIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useVerticalPlaylists from "../../hooks/useVerticalPlaylists";
import Spinner from "../spinner";

export default function Playlists() {
  const { data = [], isLoading, vertical } = useVerticalPlaylists();

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
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {data.map((playlist) => (
                <li key={playlist.ID}>
                  <Link href={`/library/${vertical}/${playlist.ID}`} passHref>
                    <div className="flex items-center space-x-2 pl-2 h-12">
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="truncate hover:text-gray-600 cursor-pointer text-sm">
                        {playlist.Title}{" "}
                        <span className="text-gray-500 font-normal">
                          by {playlist.Creator}
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>

      {/* Tablet & Desktop */}
      <div className="hidden mt-1 sm:block overflow-hidden">
        <div className="align-middle inline-block min-w-full border-b border-gray-200">
          <table className="min-w-full">
            <thead className="px-14">
              <tr className="border-t border-gray-200">
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="lg:pl-2">Playlist</span>
                </th>

                <th className="hidden md:table-cell px-3 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((playlist) => (
                <tr key={playlist.ID}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center space-x-3 lg:pl-2">
                      <FontAwesomeIcon icon={["fas", "folder"]} size="2x" />
                      <Link
                        href={`/library/${vertical}/${playlist.ID}`}
                        passHref
                      >
                        <span className="truncate hover:text-gray-600 cursor-pointer">
                          {playlist.Title}{" "}
                          <span className="text-gray-500 font-normal xl:hidden">
                            by {playlist.Author}
                          </span>
                        </span>
                      </Link>
                    </div>
                  </td>

                  <td className="hidden md:table-cell px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      {playlist.Provider === "Youtube" && (
                        <FontAwesomeIcon
                          icon={["fab", "youtube"]}
                          size="2x"
                          color="red"
                        />
                      )}
                      {playlist.Provider === "Twitch" && (
                        <FontAwesomeIcon
                          icon={["fab", "twitch"]}
                          size="2x"
                          color="purple"
                        />
                      )}
                      <span></span>
                      {playlist.Provider}
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
