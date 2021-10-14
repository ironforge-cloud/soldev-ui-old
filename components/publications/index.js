import PropTypes from "prop-types";
import Image from "next/image";

export default function Publications({ publications }) {
  return (
    <div className="relative bg-white pt-2 px-4 sm:px-6  lg:px-8">
      <div className="relative mx-auto">
        <div className="mt-3 justify-items-center mx-auto grid gap-5 md:grid-cols-2 3xl:grid-cols-3 lg:max-w-none">
          {publications.map((content) => (
            <a
              href={content.URL}
              className="block mt-2 hover:opacity-85 transition duration-200 ease-in-out transform hover:-translate-y-2"
              rel="noreferrer"
              target="_blank"
              key={content.ID}
            >
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
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    {content.Tags && (
                      <p className="text-sm font-medium text-indigo-600">
                        {content.Tags[0]}
                      </p>
                    )}

                    <p className="text-xl font-semibold text-gray-900">
                      {content.Title}
                    </p>
                    <p className="mt-3 text-base text-gray-700">
                      {content.Description}
                    </p>
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
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

Publications.propTypes = {
  publications: PropTypes.array.isRequired,
};
