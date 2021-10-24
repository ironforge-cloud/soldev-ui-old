import PropTypes from "prop-types";
import Card from "../card";
import SubmitContentCard from "../submit-content-card";

export default function Publications({ publications }) {
  return (
    <div className="relative p-5">
      <div className="relative mx-auto">
        <div className="flex flex-wrap justify-around place-content-start sm:space-x-2 md:space-x-3 2xl:p-6">
          {publications.map((content, index) => (
            <>
              <a
                href={content.Url}
                className="block mt-2 hover:opacity-85 transition duration-300 hover:scale-105 ease-in-out transform pb-7"
                rel="noreferrer"
                target="_blank"
                key={content.SK}
              >
                <Card content={content} />
              </a>
              {publications.length - 1 === index && <SubmitContentCard />}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

Publications.propTypes = {
  publications: PropTypes.array.isRequired,
};
