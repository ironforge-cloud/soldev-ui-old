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
    <div className="flex flex-col items-center dark:text-stone-400 text-sm font-medium text-gray-700">
      <label htmlFor="position" className="block">
        Position weight
      </label>
      <select
        id="position"
        name="position"
        className="mt-1 max-w-fit block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:bg-stone-400 dark:border-stone-500 dark:text-stone-800 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
