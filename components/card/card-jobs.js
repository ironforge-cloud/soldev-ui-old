import { Disclosure } from "@headlessui/react";
import { CashIcon, ChevronDownIcon, GlobeIcon } from "@heroicons/react/outline";
import Image from "next/image"

import PropTypes from "prop-types";
import { memo } from "react";
import formatNumber from "../../utils/number-format"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BountyCard({job, open}) {

  return (
    <Disclosure as="div" defaultOpen={open}>
      {({open}) => (
        <>
          <dt
            className="text-lg shadow p-1 rounded-lg bg-white dark:bg-gray-800 hover:dark:bg-gray-700 hover:bg-gray-50 hover:shadow-md">
            <Disclosure.Button
              className="text-left w-full flex justify-between items-start text-gray-400 dark:text-gray-300 px-4 py-4 sm:px-6">

              <div className="flex gap-5">
                <div
                  className="inline-block h-14 w-14 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                  {job.fields["Logo Avatar"] ?
                    <Image src={job.fields["Logo Avatar"]} layout="fill"/> :
                    <svg className="h-full w-full text-gray-300" fill="currentColor"
                         viewBox="0 0 24 24">
                      <path
                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                  }
                </div>

                <div className="flex flex-col">
                  <h3 className="text-gray-900 dark:text-gray-200">
                    {job.fields.Name}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <CashIcon className="h-7 w-6 text-green-400"/>
                    {job.fields["Minimum Salary"] === job.fields["Maximum Salary"] ?
                      <div>{formatNumber(job.fields["Maximum Salary"])}</div> :
                      <div>{formatNumber(job.fields["Minimum Salary"])} - {formatNumber(job.fields["Maximum Salary"])}</div>
                    }

                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <GlobeIcon className="h-7 w-7 text-sky-500"/>
                <span className="text-gray-600 dark:text-gray-200">
                  {job.fields.Location[0]}
                </span>
                <span className="ml-6 h-7 flex items-center">
                  <ChevronDownIcon
                    className={classNames(
                      open ? "-rotate-180" : "rotate-0",
                      "h-6 w-6 transform"
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
                  <span>{job.fields.Name}</span>
                </div>

                {/* Company */}
                <div className="sm:col-span-1">
                  <h3>Company</h3>
                  <span>
                    {job.fields.Company}
                  </span>
                </div>

                {/* Position */}
                <div className="sm:col-span-1">
                  <h3>Position</h3>
                  <span>{job.fields.Position}</span>
                </div>

                {/* Description */}
                <div className="sm:col-span-3">
                  <h3>Description</h3>
                  <p
                    dangerouslySetInnerHTML={{__html: job.description}}/>
                </div>

                {/* Apply */}
                <div
                  className="sm:col-span-3 mx-auto content-center pt-10">
                  <a
                    type="button"
                    href={job.fields["Application Link"] + "?utm_source=soldev.app"}
                    target="_blank"
                    className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer px-20 py-3 rounded-lg no-underline content text-lg"
                    rel="noreferrer"
                  >
                    Apply in Superteam Jobs
                  </a>

                </div>
                <div className="sm:col-span-3 mx-auto content-center text-sm pt-5">
                  Please reference you found the job on SolDev, this helps us get more companies
                  to post here, thanks!
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
  job: PropTypes.object.isRequired,
  open: PropTypes.bool,
};

export default memo(BountyCard);
