import ReactPlayer from "react-player";
import PropTypes from "prop-types";

export default function Player({ content }) {
  return (
    <div className="grid grid-cols-6 h-screen pt-16 justify-items-center">
      <div className="flex flex-col col-span-6 items-center w-video-xs sm:w-video-sm md:w-video-md lg:w-video-lg xl:w-video-xl 2xl:w-video-2xl 3xl:w-video-3xl xs:text-xs text-base">
        <div className="self-end mb-1">
          <a
            href={content.Url}
            className="text-purple-600 hover:text-purple-700"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-lg pb-1 hover:underline">
              Watch in {content.Provider} &rarr;{" "}
            </p>
          </a>
        </div>
        <div
          className="w-video-xs h-video-xs sm:w-video-sm sm:h-video-sm 
      md:w-video-md md:h-video-md lg:w-video-lg lg:h-video-lg xl:w-video-xl xl:h-video-xl 2xl:w-video-2xl 2xl:h-video-2xl 3xl:w-video-3xl 3xl:h-video-3xl"
        >
          <ReactPlayer
            width="100%"
            height="100%"
            url={content.Url}
            controls
            pip
            stopOnUnmount={false}
          />
        </div>
        <div className="self-start md:text-lg">
          <h1 className=" font-medium text-gray-800 sm:mt-4 xl:text-xl 3xl:text-2xl">
            {content.Title}
          </h1>
          <p className="mt-2 text-gray-600 sm:mt-4">{content.Description}</p>
        </div>
      </div>
    </div>
  );
}

Player.propTypes = {
  content: PropTypes.object.isRequired,
};
