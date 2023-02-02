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
        className="inline-flex justify-center py-2 text-sm font-medium uppercase text-gray-900 dark:text-gray-200"
        onClick={handleShow}
      >
        {title}
        <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
      </button>

      {show && (
        <div className="max-w-5xl cursor-text pl-4 xl:pl-6">
          {/* Page Sections List */}
          {title === 'Content' &&
            content.map((lineItem, i) => (
              <ul
                className="mb-1 inline-flex w-full cursor-pointer list-disc text-sm font-medium text-gray-900 underline dark:text-gray-200"
                key={i}
              >
                <li>
                  <a href={`#${lineItem.toLowerCase().replace(/\W/g, '-')}`} onClick={handleClick}>
                    {lineItem}
                  </a>
                </li>
              </ul>
            ))}

          {/* SIMD Details */}
          {title === 'Details' && (
            <table className="w-full cursor-text text-xs font-medium text-gray-900 dark:text-gray-200 xl:text-sm">
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
                      ? content.authors.map((author, index) => <div key={index}>{author.name}</div>)
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td className="px-1 font-medium">Type</td>
                  <td className="px-1">{content.type ? content.type : '-'}</td>
                </tr>
                <tr>
                  <td className="px-1 font-medium">Status</td>
                  {content.status ? (
                    <td className="px-1">
                      <span
                        className="inline-flex rounded-full border-[1px] border-gray-700 bg-green-100 px-2 text-xs
                    leading-5 text-green-800 dark:border-none dark:bg-orange-100 dark:text-orange-800"
                      >
                        {content.status}
                      </span>
                    </td>
                  ) : (
                    <td className="px-1">-</td>
                  )}
                </tr>
                <tr>
                  <td className="px-1 font-medium">Created</td>
                  <td className="px-1">{content.created ? content.created : '-'}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
