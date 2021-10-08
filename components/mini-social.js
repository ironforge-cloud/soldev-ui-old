import { Timeline } from "react-twitter-widgets";
import React from "react";

function MiniSocial() {
  return (
    <aside className="hidden w-96 bg-white rounded-lg shadow-lg border overflow-hidden xl:block">
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

export default React.memo(MiniSocial);
