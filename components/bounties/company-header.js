import Image from "next/image";
import BountyStats from "./stats";
import { memo } from "react";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CompanyHeader({ company, stats }) {
  return (
    <>
      <div className="flex justify-center rounded-lg mx-auto flex flex-col">
        <div
          className={classNames(
            "mx-auto h-[200px] w-[200px] rounded-full p-2 border-4 dark:border-gray-700",
            company.BgColor === "bg-white"
              ? "bg-white border-gray-300"
              : "bg-black border-gray-500"
          )}
        >
          <Image
            placeholder="blur"
            blurDataURL={company.Logo}
            src={company.Logo}
            width="250px"
            height="250px"
          />
        </div>

        <div className="prose dark:prose-invert mx-auto text-center prose-h1:mb-5 mt-6">
          <h1>{company.Name} Bounties</h1>
          <h5>{company.Description}</h5>
        </div>
      </div>

      <div className="mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
              Overview
            </h2>

            {/* Stats */}
            <BountyStats stats={stats} />
          </div>
        </div>
      </div>
    </>
  );
}

CompanyHeader.propTypes = {
  company: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
};

export default memo(CompanyHeader);
