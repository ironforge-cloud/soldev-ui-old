import PropTypes from "prop-types";
import Image from "next/image";
import Card from "../card";

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
              <Card content={content} />
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
