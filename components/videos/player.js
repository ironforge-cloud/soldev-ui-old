import ReactPlayer from "react-player";
import PropTypes from "prop-types";

export default function Player({ content }) {
  return (
    <div className="grid grid-cols-6 h-screen pt-16 justify-items-center">
      <div
        className="flex col-span-6 w-video-xs h-video-xs sm:w-video-sm sm:h-video-sm 
      md:w-video-md md:h-video-md lg:w-video-lg lg:h-video-lg xl:w-video-xl xl:h-video-xl 2xl:w-video-2xl 2xl:h-video-2xl 3xl:w-video-3xl 3xl:h-video-3xl"
      >
        <ReactPlayer
          width="100%"
          height="100%"
          url={content.Url}
          controls
          pip
        />
      </div>
      <div className="col-span-2">
        <p>
          {content.Channel}: {content.Title}
        </p>
        <p>{content.Description}</p>
      </div>
      <div className="col-span-2"></div>
    </div>
  );
}

Player.propTypes = {
  content: PropTypes.object.isRequired,
};
