import { Timeline } from "react-twitter-widgets";
import React from "react";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MiniSocial({ size }) {
  return (
    <aside
      className={classNames(
        "hidden w-96 bg-white rounded-lg shadow-lg border overflow-hidden",
        size === "xl" && " xl:block",
        size === "2xl" && "2xl:block"
      )}
    >
      <div className="mt-6 px-3">
        <h2 className="text-gray-500 pl-3 text-xs font-medium uppercase tracking-wide mb-3">
          Social Timeline
        </h2>

        <Timeline
          dataSource={{
            sourceType: "list",
            ownerScreenName: "soldevapp",
            id: "1444990678371651585",
          }}
          options={{
            dnt: true,
            chrome: "noheader nofooter noborders transparent",
          }}
        />
      </div>
    </aside>
  );
}

MiniSocial.defaultProps = {
  size: "xl",
};

MiniSocial.propTypes = {
  size: PropTypes.string,
};

export default React.memo(MiniSocial);
