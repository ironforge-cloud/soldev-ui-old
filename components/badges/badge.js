import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Badge({ text }) {
  return (
    <div>
      <span
        className={classNames(
          "items-center px-2 py-0.5 rounded text-xs uppercase rounded bg-rose-400 text-gray-50",
          text === "New" &&
            "bg-purple-400 text-purple-50 dark:bg-purple-700 dark:text-purple-100",
          text === "Old" &&
            "bg-gray-400 text-gray-50 dark:bg-gray-600 text-gray-100 opacity-50",
          text === "Hot" &&
            "bg-red-400 text-red-50 dark:bg-red-700 text-red-100",
          text === "Best" &&
            "bg-blue-400 text-blue-50 dark:bg-blue-700 text-blue-100"
        )}
      >
        {text}
      </span>
    </div>
  );
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
};
