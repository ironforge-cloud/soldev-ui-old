import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function BountyCard({ bounty, open }) {
  return (
    <Disclosure
as="div"
defaultOpen={open}
    >
      {({ open }) => (
        <>
          <dt className="text-lg shadow p-1 rounded-lg bg-white dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-50 hover:shadow-md">
            <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400 dark:text-gray-300 px-4 py-4 sm:px-6">
              <div>
                <h3 className="text-gray-900 dark:text-gray-200">
                  {bounty.Title}
                </h3>
                <div className="flex gap-2 mt-2">
                  {Array.isArray(bounty.Tags.names) &&
                    bounty.Tags.names.map((tag) => (
                      <span
                        key={tag}
                        className="text-white dark:text-gray-200 bg-green-500 dark:bg-green-800 items-center px-3 py-0.5 rounded-lg text-sm font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex">
                <span className="text-gray-600 dark:text-gray-200">
                  {new Intl.NumberFormat('en-US').format(bounty.Reward)}
                  &nbsp;{bounty.RewardAsset}
                </span>
                <span className="ml-6 h-7 flex items-center">
                  <ChevronDownIcon
                    className={classNames(
                      open ? '-rotate-180' : 'rotate-0',
                      'h-6 w-6 transform'
                    )}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel
            as="dd"
            className="mt-1 shadow rounded-lg sm:p-5 bg-white dark:bg-gray-800 pb-14"
          >
            <div className="px-10 sm:px-6">
              <dl className="grid grid-cols-1 sm:grid-cols-3 prose dark:prose-invert max-w-5xl">
                {/* Title */}
                <div className="sm:col-span-1">
                  <h3>Title</h3>
                  <span>{bounty.Title}</span>
                </div>

                {/* Reward */}
                <div className="sm:col-span-1">
                  <h3>Reward</h3>
                  <span>
                    {new Intl.NumberFormat('en-US').format(bounty.Reward)}
                    &nbsp;{bounty.RewardAsset}
                  </span>
                </div>

                {/* Delivery Date */}
                <div className="sm:col-span-1">
                  <h3>Delivery Date</h3>
                  <span>{bounty.DeliveryDate}</span>
                </div>

                {/* Description */}
                <div className="sm:col-span-3">
                  <h3>Description</h3>
                  <p>{bounty.Description}</p>
                </div>

                {/* Apply */}
                <div className="sm:col-span-3 mx-auto content-center py-10">
                  <a
                    type="button"
                    href={bounty.URL}
                    target="_blank"
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer px-20 py-3 rounded-lg no-underline content text-lg"
                    rel="noreferrer"
                  >
                    Claim Bounty
                  </a>
                </div>
              </dl>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

BountyCard.defaultProps = {
  open: false,
};

BountyCard.propTypes = {
  bounty: PropTypes.object.isRequired,
  open: PropTypes.bool,
};

export default memo(BountyCard);
