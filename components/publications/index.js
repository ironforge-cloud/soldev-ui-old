import PropTypes from "prop-types";
import Card from "./card";
import SubmitContentCard from "./submit-content-card";

export default function Publications({ publications, type }) {
  return (
    <div className="relative flex flex-col mx-auto">
      <div className="pt-7 pb-2 flex justify-center">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 capitalize w-max p-3">
          {type === "sdk" ? "SDK & Frameworks" : type}
        </h2>
        <div></div>
      </div>
      <div className="flex flex-wrap justify-around 3xl:justify-center place-content-start p-2 2xl:p-6">
        <SubmitContentCard />
        {publications.map((content) => (
          <a
            href={content.Url}
            className="block mt-2 hover:opacity-85 transform-gpu transition duration-300 hover:scale-105 ease-in-out pb-7 px-1 2xl:px-6 3xl:p-8"
            rel="noreferrer"
            target="_blank"
            key={content.SK}
          >
            <Card content={content} />
          </a>
        ))}
      </div>
    </div>
  );
}

Publications.propTypes = {
  publications: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};
