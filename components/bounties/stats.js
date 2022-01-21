import PropTypes from "prop-types";
import { memo } from "react";
import { ScaleIcon } from "@heroicons/react/outline";

function BountyStats({ stats }) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Balance */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ScaleIcon
                className="h-6 w-6 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                  {stats[0].name}
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    {stats[0].amount}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Bounties available */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ScaleIcon
                className="h-6 w-6 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                  {stats[1].name}
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    {stats[1].amount}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Paid balance */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ScaleIcon
                className="h-6 w-6 text-gray-400 dark:text-gray-200"
                aria-hidden="true"
              />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                  {stats[2].name}
                </dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    {stats[2].amount}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BountyStats.propTypes = {
  stats: PropTypes.object.isRequired,
};

export default memo(BountyStats);
