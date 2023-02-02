import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

export default function Dropdown({ title, content }) {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };

  // Scroll to the section on click
  const handleClick = event => {
    event.preventDefault();
    const target = event.target;
    const id = target.getAttribute('href').slice(1);
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
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
        <div className="max-w-5xl pl-2">
          {/* Page Sections List */}
          {title === 'Content' &&
            content.map((lineItem, i) => (
              <p
                className="prose inline-flex w-full text-sm font-medium text-gray-900 hover:underline dark:text-gray-200"
                key={i}
              >
                <a
                  className="no-underline"
                  href={`#${lineItem.toLowerCase().replace(/\W/g, '-')}`}
                  onClick={handleClick}
                >
                  {lineItem}
                </a>
              </p>
            ))}

          {/* SIMD Details */}
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
                            {author.name}
                            {/* {author.org && `(${author.org})`} */}
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
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
