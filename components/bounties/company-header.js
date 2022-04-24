import Image from 'next/image';
import BountyStats from './stats';
import { memo } from 'react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function CompanyHeader({ company, stats }) {
  return (
    <>
      <div className="mx-auto flex flex-col justify-center rounded-lg">
        <div
          className={classNames(
            'mx-auto h-[200px] w-[200px] rounded-full border-4 p-2 dark:border-gray-700',
            company.BgColor === 'bg-white' ? 'border-gray-300 bg-white' : 'border-gray-500 bg-black'
          )}
        >
          <Image
            placeholder="blur"
            blurDataURL={company.Logo}
            src={company.Logo}
            width="250px"
            height="250px"
            alt="company logo"
          />
        </div>

        <div className="prose mx-auto mt-6 text-center prose-h1:mb-5 dark:prose-invert">
          <h1>{company.Name} Bounties</h1>
          <h5>{company.Description}</h5>
        </div>
      </div>

      <div className="mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200">
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
  stats: PropTypes.object.isRequired
};

export default memo(CompanyHeader);
