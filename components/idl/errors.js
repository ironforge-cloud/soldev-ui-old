import { memo } from 'react';

function IDLErrors({ data }) {
  return (
    <div className="mt-5 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-200">
                  <th scope="col" className="py-3 pl-4 pr-3  sm:pl-6">
                    Code
                  </th>
                  <th scope="col" className="px-3 py-3 ">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3 ">
                    Message
                  </th>
                </tr>
              </thead>
              <tbody className="prose divide-y divide-gray-200 bg-white dark:bg-gray-800">
                {data.map(item => (
                  <tr key={item.code} className="font-mono text-sm text-gray-500 dark:text-gray-300">
                    <td className="py-4 pl-4 pr-3 sm:pl-6">{item.code}</td>
                    <td className="px-3 py-4">{item.name}</td>
                    <td className="px-3 py-4">{item.msg}</td>
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

export default memo(IDLErrors);
