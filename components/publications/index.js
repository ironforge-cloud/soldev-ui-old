import PropTypes from "prop-types";
import Image from "next/image";

export default function Publications({ publications }) {
  return (
    <div className="flex flex-wrap justify-around place-content-start">
      {publications.map((content) => (
        <a
          href={content.URL}
          className="block mt-2"
          rel="noreferrer"
          target="_blank"
          key={content.ID}
        >
          <div className="flex flex-col rounded-lg shadow-lg border overflow-hidden m-2 md:my-4 md:mx-4 lg:my-6 lg:mx-6">
            <Image
              className="h-48 w-full object-cover"
              src={content.ImageURL}
              alt=""
              height="180"
              width="340"
              quality="100"
              placeholder="blur"
              blurDataURL={content.ImageURL}
            />
            <div
              className="bg-yellow-100 bg-opacity-75 p-6 flex flex-col justify-between text-center"
              style={{ width: "340px" }}
            >
              <p className="text-sm font-medium text-indigo-600">
                {content.Tags && content.Tags[0]}
              </p>

              <p className="text-xl font-semibold text-gray-900">
                {content.Title}
              </p>
              <p className="mt-3 text-base text-gray-500">
                {content.Description}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

Publications.propTypes = {
  publications: PropTypes.array.isRequired,
};
