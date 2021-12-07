import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Badge({ text }) {
  return (
    <div>
      <span
        className={classNames(
          "items-center px-2 py-0.5 rounded text-xs uppercase rounded",
          text === "New" && "bg-sky-400 text-green-50",
          text === "Old" && "bg-gray-400 text-gray-50 opacity-50",
          text === "Hot" && "bg-red-400 text-red-50",
          text === "Best" && "bg-yellow-400 text-indigo-50"
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
