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
          {title === 'Content' &&
            content.map((lineItem, i) => (
              <p
                className="prose inline-flex w-full text-sm font-medium text-gray-900 dark:text-gray-200"
                key={i}
              >
                <a name={`section${i}`}></a>
                {lineItem}
              </p>
            ))}

          {title === 'Details' && (
            <table className="w-full p-4 text-sm font-medium text-gray-900 dark:text-gray-200">
              <tbody>
                <tr>
                  <td className="px-1 font-medium">SIMD</td>
                  <td className="px-1">{content.simd}</td>
                </tr>
                <tr>
                  <td className="px-1 font-medium">Title</td>
                  <td className="px-1">{content.title}</td>
                </tr>
                <tr>
                  <td className="px-1 align-top font-medium">Authors</td>
                  <td className="px-1">
                    {content.authors
                      ? content.authors.map((author, index) => (
                          <div key={index}>
                            {author.name} {author.org && `(${author.org})`}
                          </div>
                        ))
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td className="px-1 font-medium">Type</td>
                  <td className="px-1">{content.type}</td>
                </tr>
                <tr>
                  <td className="px-1 font-medium">Status</td>
                  <td className="px-1">{content.status}</td>
                </tr>
                <tr>
                  <td className="px-1 font-medium">Created</td>
                  <td className="px-1">{content.created}</td>
                </tr>
                {/* <tr>
                  <td className="px-1 font-medium">Github</td>
                  <td className="px-1">
                    <a href={item.html_url} className="text-blue-500 hover:text-blue-600">
                      Add Link
                    </a>
                  </td>
                </tr> */}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
