import { LinkIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';

const NotificationSuccess = dynamic(() => import('../notifications/success'));

function CopyLink({ title, url }) {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
        onClick={() => {
          navigator.clipboard.writeText(url);
          setShowNotification(true);
        }}
      >
        <LinkIcon className="h-5 w-5" aria-hidden="true" />
        <span className="font-medium">Link</span>
      </button>

      <NotificationSuccess
        type="link"
        show={showNotification}
        setShow={setShowNotification}
        text="Link copied successfully"
        subText={`The link to: ${title} was copied to the clipboard.`}
      />
    </>
  );
}

CopyLink.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default memo(CopyLink);
