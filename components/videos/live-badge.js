import PropTypes from "prop-types";

export default function LiveBadge({ live }) {
  return (
    <span
      style={{ top: "10px", left: "10px", zIndex: 1 }}
      className="absolute inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-600 text-white"
    >
      <svg
        className="mr-1.5 h-2 w-2 text-white"
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {live ? "Live" : "Offline"}
    </span>
  );
}

LiveBadge.propTypes = {
  live: PropTypes.number.isRequired,
};
