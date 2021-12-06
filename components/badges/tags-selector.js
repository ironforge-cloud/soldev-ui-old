import PropTypes from "prop-types";
import { useState } from "react";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TagsSelector({ tags, contentType }) {
  const [selected, setSelected] = useState([]);

  function onClick(tag) {
    if (selected.includes(tag)) {
      const filtered = selected.filter((value) => value !== tag);
      setSelected(filtered);
    } else {
      setSelected((prevTags) => [...prevTags, tag]);
    }
  }

  return (
    <div className="flex gap-2">
      {tags.map((tag) => {
        return (
          <Link key={tag} href={`/library/${contentType}/tag/${tag}`} passHref>
            <button
              onClick={() => onClick(tag)}
              className={classNames(
                selected.includes(tag) ? "bg-red-500" : "bg-gray-400",
                "inline-flex items-center px-4 py-1 rounded-lg text-sm text-gray-100 font-medium transition transform-gpu duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 cursor-pointer hover:opacity-90"
              )}
            >
              {tag}
            </button>
          </Link>
        );
      })}
    </div>
  );
}

TagsSelector.propTypes = {
  tags: PropTypes.array.isRequired,
  contentType: PropTypes.string.isRequired,
};
