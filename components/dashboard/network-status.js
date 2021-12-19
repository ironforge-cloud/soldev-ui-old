import { memo } from "react";
import Link from "next/link";

function NetworkStatus() {
  return (
    <section>
      <div className="p-6 space-y-4">
        <div>
          <h2
            id="who-to-follow-heading"
            className="text-base font-medium text-gray-900 dark:text-stone-200"
          >
            Mainnet Beta
          </h2>

          <div className="mt-3 bg-green-400 dark:bg-green-700 h-10 flex justify-center items-center rounded-lg shadow cursor-pointer blur-md">
            <span className="">All Systems Operational</span>
          </div>
        </div>
        <div>
          <h2
            id="who-to-follow-heading"
            className="text-base font-medium text-gray-900 dark:text-stone-200"
          >
            Devnet
          </h2>

          <div className="mt-3 bg-green-400 dark:bg-green-700 h-10 flex justify-center items-center rounded-lg shadow blur-md">
            <span className="">All Systems Operational</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(NetworkStatus);
