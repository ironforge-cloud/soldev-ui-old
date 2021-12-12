import { memo } from "react";

function NetworkStatus() {
  return (
    <section>
      <div className="bg-white rounded-lg shadow p-6">
        <h2
          id="who-to-follow-heading"
          className="text-base font-medium text-gray-900 "
        >
          Network Status
        </h2>
        <div className="mt-3 bg-green-400 h-10 flex justify-center items-center rounded-lg shadow blur-lg">
          <span className="">All Systems Operational</span>
        </div>
      </div>
    </section>
  );
}

export default memo(NetworkStatus);
