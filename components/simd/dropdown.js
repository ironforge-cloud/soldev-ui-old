import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

// TODO: mandate props of this component
export default function Dropdown({ title, content }) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <button
        className="inline-flex justify-center py-2 text-sm font-medium text-gray-900 dark:text-gray-200"
        onClick={handleShow}
      >
        {title}
        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>

      {show && (
        <div className="max-w-5xl pl-10">
          <p className="prose inline-flex w-full text-sm font-medium text-gray-900 dark:text-gray-200">
            {content}
          </p>
        </div>
      )}
    </div>
  );
}
