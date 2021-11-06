import PropTypes from "prop-types";

export default function SuperTags({ text }) {
  return (
    <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-600 capitalize">
      {text}
    </span>
  );
}

SuperTags.propTypes = {
  text: PropTypes.string.isRequired,
};
