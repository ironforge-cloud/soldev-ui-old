import PropTypes from "prop-types";
import { memo } from "react";
import {
  CogIcon,
  AdjustmentsIcon,
  LockOpenIcon,
} from "@heroicons/react/outline";

function Card({ content, editMode }) {
  return (
    <div className="relative flex flex-col p-6 rounded-lg shadow-lg bg-gradient-to-b from-yellow-100 to-yellow-50 bg-opacity-70 hover:bg-opacity-80 overflow-hidden w-[260px] h-[340px] hover:opacity-85 transform-gpu transition duration-300 hover:scale-105 ease-in-out">
      <div className="flex-1">
        <p className="text-lg font-semibold text-gray-900">{content.Title}</p>
        <p className="mt-3 text-base text-gray-700">{content.Description}</p>
      </div>
      <p className="text-sm font-medium text-indigo-600">
        {content.Tags.map((tag, index) => (
          <span key={index}>
            {tag}
            {index < content.Tags.length - 1 && <>{", "}</>}
          </span>
        ))}
      </p>
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
      {editMode && (
        <div className="absolute top-3 right-2">
          {/*<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-200 opacity-75"></span>*/}
          <LockOpenIcon className="animate-bounce h-6 w-6" />
        </div>
      )}
    </div>
  );
}

Card.defaultProps = {
  editMode: false,
};

Card.propTypes = {
  content: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
};

export default memo(Card);
