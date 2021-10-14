import PropTypes from "prop-types";
import Image from "next/image";

export default function Card({ content }) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden max-w-sm">
      <div className="flex-shrink-0">
        <Image
          className=" object-cover"
          src={content.ImageURL}
          alt=""
          height="186"
          width="413"
          quality="100"
          placeholder="blur"
          blurDataURL={content.ImageURL}
        />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            {content.Tags.map((tag, index) => (
              <span key={index}>
                {tag}
                {index < content.Tags.length - 1 && <>{", "}</>}
              </span>
            ))}
          </p>
          <p className="text-xl font-semibold text-gray-900">{content.Title}</p>
          <p className="mt-3 text-base text-gray-700">{content.Description}</p>
        </div>
        <div className="mt-3 flex items-center">
          <div className="flex-shrink-0">
            <span className="sr-only">{content.Author}</span>
          </div>
          {content.Author && (
            <div className="">
              <p className="text-sm font-medium text-gray-500">
                Author: {content.Author}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  content: PropTypes.object.isRequired,
};
