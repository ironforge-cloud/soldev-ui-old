import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import Link from "next/link";

export default function Player({ content }) {
  return (
    <div className="flex flex-col max-w-screen-3xl mx-auto px-5 xs:text-xs text-base">
      <div className="flex justify-between">
        <Link href={`/library/${content.PlaylistID}`} passHref>
          <p className="text-md lg:text-lg pb-4 hover:underline text-sky-600 hover:text-sky-700 dark:text-sky-500 hover:dark:text-sky-400 cursor-pointer">
            &larr; Back to Playlist
          </p>
        </Link>

        <a href={content.Url} target="_blank" rel="noreferrer">
          <p className="text-md lg:text-lg pb-4 hover:underline text-sky-600 hover:text-sky-700 dark:text-sky-500 hover:dark:text-sky-400">
            Watch in {content.Provider} &rarr;{" "}
          </p>
        </a>
      </div>

      <div className="shadow-lg aspect-[16/9] w-full">
        <ReactPlayer
          height="100%"
          width="100%"
          style={{ aspectRatio: "16/9" }}
          url={content.Url}
          controls
          pip
          stopOnUnmount={false}
        />
      </div>

      <div className="self-start md:text-lg">
        <h1 className="font-medium text-gray-800 dark:text-gray-200 sm:mt-4 xl:text-xl 3xl:text-2xl">
          {content.Title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 sm:mt-4">
          {content.Description}
        </p>
      </div>
    </div>
  );
}

Player.propTypes = {
  content: PropTypes.object.isRequired,
};
