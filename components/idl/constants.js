import { memo } from 'react';

function IDLConstants({ data }) {
  return (
    <div className="mt-5 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-500">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
                  <th scope="col" className="py-3 pl-4 pr-3 sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Fields
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="prose divide-y divide-gray-200 bg-white dark:divide-gray-500 dark:bg-gray-800">
                {data.map(item => (
                  <tr
                    key={item.name}
                    className="whitespace-nowrap font-mono text-sm text-gray-500 dark:text-gray-400"
                  >
                    <td className="py-4  pl-4 pr-3 sm:pl-6">{item.name}</td>
                    <td className="whitespace-nowrap px-3 py-4">
                      <span className="inline-flex items-center rounded bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800">
                        `{item.type.defined}`
                      </span>
                    </td>
                    <td className="px-3 py-4">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(IDLConstants);
