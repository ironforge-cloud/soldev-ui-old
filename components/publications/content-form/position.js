import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";

function Position({ data, setData, list }) {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    if (data && data.Position !== 0) {
      setPosition(data.Position);
    }
  }, [data]);
  return (
    <div className="w-20 text-center">
      <label
        htmlFor="position"
        className="block text-sm font-medium text-gray-700"
      >
        Position
      </label>
      <select
        id="position"
        name="position"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={position}
        onChange={(e) =>
          setData({ ...data, Position: parseInt(e.target.value) })
        }
      >
        {list.map((item) => {
          return <option key={item}>{item}</option>;
        })}
      </select>
    </div>
  );
}

Position.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
};

export default memo(Position);
