import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/solid";
import { BookmarkIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { memo } from "react";
import fetch from "isomorphic-unfetch";

function PinActions({ pinned, tweetID }) {
  const onClick = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pin/${tweetID}`, {
      method: "PATCH",
    });
  };

  if (pinned === 1) {
    return (
      <button>
        <BookmarkSolid className="h-6 w-6" onClick={onClick} />
      </button>
    );
  } else {
    return (
      <button>
        <BookmarkIcon className="h-6 w-6" onClick={onClick} />
      </button>
    );
  }
}

PinActions.propTypes = {
  pinned: PropTypes.number,
  tweetID: PropTypes.string.isRequired,
};

export default memo(PinActions);
