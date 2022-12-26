import { Disclosure } from '@headlessui/react';
import { CashIcon, ChevronDownIcon, GlobeIcon } from '@heroicons/react/outline';
import Image from 'next/image';

import PropTypes from 'prop-types';
import { memo } from 'react';
import formatNumber from '../../utils/number-format';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function JobCard({ job, open }) {
  return (
    <Disclosure
as="div"
defaultOpen={open}
    >
      {({ open }) => (
        <>
          <dt className="rounded-lg bg-white p-1 text-lg shadow hover:bg-gray-50 hover:shadow-md dark:bg-gray-800 hover:dark:bg-gray-700">
            <Disclosure.Button className="flex w-full items-start justify-between px-4 py-4 text-left text-gray-400 dark:text-gray-300 sm:px-6">
              <div className="flex gap-5">
                <div className="relative inline-block h-14 w-14 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  {job.fields['Logo Avatar'] ? (
                    <Image
src={job.fields['Logo Avatar']}
layout="fill"
alt=""
                    />
                  ) : (
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  )}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-gray-900 dark:text-gray-200">{job.fields.Name}</h3>
                  <div className="mt-2 flex gap-2">
                    <GlobeIcon className="h-7 w-7 text-sky-500" />
                    <span className="text-gray-600 dark:text-gray-200">{job.fields.Location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {/* <div className="mx-auto content-center pt-10 sm:col-span-3">
                  <a
                    type="button"
                    href={job.fields['Application Link'] + '?utm_source=soldev.app'}
                    target="_blank"
                    className="content cursor-pointer rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-20 py-3 text-lg no-underline hover:from-pink-500 hover:to-yellow-500"
                    rel="noreferrer"
                  >
                    Apply
                  </a>
                </div> */}
                <span className="ml-6 flex h-7 items-center">
                  <ChevronDownIcon
                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel
            as="dd"
            className="mt-1 rounded-lg bg-white pb-14 shadow dark:bg-gray-800 sm:p-5"
          >
            <div className="px-10 sm:px-6">
              <dl className="prose grid max-w-5xl grid-cols-1 dark:prose-invert sm:grid-cols-3">
                {/* Title */}
                <div className="sm:col-span-1">
                  <h3>Title</h3>
                  <span>{job.fields.Name}</span>
                </div>

                {/* Company */}
                <div className="sm:col-span-1">
                  <h3>Company</h3>
                  <span>{job.fields.Company}</span>
                </div>

                {/* Position */}
                <div className="sm:col-span-1">
                  <h3>Position</h3>
                  <span>{job.fields.Position}</span>
                </div>

                {/* Description */}
                <div className="sm:col-span-3">
                  <h3>Description</h3>
                  <p dangerouslySetInnerHTML={{ __html: job.description }} />
                </div>

                {/* Apply */}
                <div className="mx-auto content-center pt-10 sm:col-span-3">
                  <a
                    type="button"
                    href={job.fields['Application Link'] + '?utm_source=soldev.app'}
                    target="_blank"
                    className="content cursor-pointer rounded-lg bg-gradient-to-r from-green-400 to-blue-500 px-20 py-3 text-lg no-underline hover:from-pink-500 hover:to-yellow-500"
                    rel="noreferrer"
                  >
                    Apply in Superteam Jobs
                  </a>
                </div>
                <div className="mx-auto content-center pt-5 text-sm sm:col-span-3">
                  Please reference you found the job on SolDev, this helps us get more companies to
                  post here, thanks!
                </div>
              </dl>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

JobCard.defaultProps = {
  open: false
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  open: PropTypes.bool
};

export default memo(JobCard);
