import ReactPlayer from "react-player";
import PropTypes from "prop-types";

export default function Player({ content }) {
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto px-5 xs:text-xs text-base">
      <div className="self-end">
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

      <div className="shadow-lg aspect-[16/9] w-full">
        <ReactPlayer
          width="100%"
          height="100%"
          className=""
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
  );
}

Player.propTypes = {
  content: PropTypes.object.isRequired,
};
