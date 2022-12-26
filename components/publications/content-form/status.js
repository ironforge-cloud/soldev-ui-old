import { Fragment, useState, useEffect, memo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

const publishingOptions = [
  {
    title: 'active',
    description: 'Approved content and visible by everyone',
  },
  {
    title: 'submitted',
    description: 'Submitted content, waiting for an Admin approval',
  },
  {
    title: 'inactive',
    description: 'Inactive content, only visible by Admins (soft-delete)',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Status({ data, setData }) {
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (data) {
      if (data.ContentStatus === 'active') {
        setSelected(publishingOptions[0]);
      } else if (data.ContentStatus === 'submitted') {
        setSelected(publishingOptions[1]);
      } else {
        setSelected(publishingOptions[2]);
      }
    }
  }, [data]);

  function onChange(e) {
    setSelected(e.title);
    setData({ ...data, ContentStatus: e.title });
  }

  return (
    <Listbox
value={selected}
onChange={onChange}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">
            Change publication status
          </Listbox.Label>
          <div className="relative">
            <div className="inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
              <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-indigo-600">
                <div className="relative inline-flex items-center bg-indigo-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                  <CheckIcon
className="h-5 w-5"
aria-hidden="true"
                  />
                  <p className="ml-2.5 text-sm font-medium capitalize">
                    {selected.title}
                  </p>
                </div>
                <Listbox.Button className="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                  <span className="sr-only">Change publication status</span>
                  <ChevronDownIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </Listbox.Button>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {publishingOptions.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-500' : 'text-gray-900',
                        'cursor-default select-none relative p-4 text-sm capitalize'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? 'text-white' : 'text-indigo-500'
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={classNames(
                            active ? 'text-indigo-200' : 'text-gray-500',
                            'mt-2'
                          )}
                        >
                          {option.description}
                        </p>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

Status.propTypes = {
  setData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default memo(Status);
