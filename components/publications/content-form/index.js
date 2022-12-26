import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import ContentTags from './tags';
import { memo, useState } from 'react';
import Radios from './radios';
import Inputs from './inputs';
import Status from './status';
import Position from './position';
import { useRouter } from 'next/router';
import useUser from '../../../hooks/useUser';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ContentForm({ type, setOpen, data, setData, setNotifySuccess, positions }) {
  const [contentExist, setContentExist] = useState(false);
  const { isAdmin = false } = useUser();
  const router = useRouter();

  const createContent = async event => {
    event.preventDefault();

    // If the user is an admin, content will be active by default
    const content = data;
    if (isAdmin) {
      content.ContentStatus = 'active';
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: 'POST',
      body: JSON.stringify({
        ...content
      })
    });

    // After submitting we need to restart the
    // component state
    setData({
      Title: '',
      Author: '',
      Description: '',
      Url: '',
      Vertical: 'Solana',
      Tags: [],
      ContentType: '',
      SpecialTag: 'New',
      Position: 0,
      Lists: '',
      ContentStatus: 'submitted'
    });

    // Send success notification
    setNotifySuccess(true);
  };

  const updateContent = async event => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: 'PUT',
      body: JSON.stringify([{ ...data }])
    });

    // call preview mode
    await fetch(`/api/preview?type=${data.ContentType}`);

    // Edit happens inside a modal, we need to close it after
    setOpen(false);
    router.reload();
  };

  return (
    <div className="overflow-hidden relative px-4 py-16 h-full bg-white dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-3xl">
        <div className="absolute top-0 right-1">
          {type === 'edit' && <Position
data={data}
setData={setData}
list={positions}
          />}
        </div>
        <div className="mx-auto max-w-max text-center prose prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
          <h1>{type === 'submit' ? 'Submit new content' : 'Edit Content'}</h1>

          <p>
            {type === 'submit' &&
              `Propose new content to the platform. Submissions will be manually
                            reviewed before deciding to publish them to the site.`}
          </p>
        </div>
        {type === 'edit' && (
          <div className="mx-auto max-w-max">
            <Status
data={data}
setData={setData}
            />
          </div>
        )}

        <div className="mt-12">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-10 gap-y-6 gap-x-8"
            onSubmit={type === 'edit' ? updateContent : createContent}
          >
            {/*Inputs*/}
            <Inputs
              data={data}
              setData={setData}
              type={type}
              contentExist={contentExist}
              setContentExist={setContentExist}
            />

            {/*Radios components*/}
            <Radios
data={data}
setData={setData}
type={type} />

            {/* Tags */}
            <ContentTags
data={data}
setData={setData}
type={type} />

            {/* Buttons */}
            <div className="flex col-span-full justify-end mx-auto max-w-3xl">
              {type === 'edit' && (
                <button
                  type="button"
                  className="px-6 py-3 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => {
                    if (type === 'edit') setOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={contentExist}
                className={classNames(
                  'ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-200',
                  contentExist && 'disabled:opacity-50'
                )}
              >
                {type === 'submit' ? 'Submit' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

ContentForm.propTypes = {
  type: PropTypes.oneOf(['submit', 'edit']),
  setOpen: PropTypes.func,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  positions: PropTypes.array
};

export default memo(ContentForm);
