import { memo } from 'react';

import renderArguments from '../../utils/renderArguments';

function renderAccounts(accounts) {
  let component = [];

  for (let i = 0; i < accounts.length; i++) {
    component.push(
      <div className="flex gap-2 pb-1" key={accounts[i].name}>
        <span>{accounts[i].name}</span>
        <div className="flex gap-1">
          {accounts[i].isSigner && (
            <span className="inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
              isSigner
            </span>
          )}
          {accounts[i].isMut && (
            <span className="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
              isMut
            </span>
          )}
        </div>
      </div>
    );
  }

  return component;
}

function Instructions({ data }) {
  return (
    <div className="mt-5 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-200">
                  <th scope="col" className="py-3 pl-4 pr-3 sm:pl-6">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Arguments
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Accounts
                  </th>
                </tr>
              </thead>
              <tbody className="prose divide-y divide-gray-200 bg-white dark:bg-gray-800">
                {data.map(item => (
                  <tr
                    key={item.name}
                    className="whitespace-nowrap font-mono text-sm text-gray-500 dark:text-gray-300"
                  >
                    <td className=" py-4 pl-4 pr-3 sm:pl-6">{item.name}</td>
                    <td className="px-3 py-4">{renderArguments(item.args)}</td>
                    <td className="px-3 py-4">{renderAccounts(item.accounts)}</td>
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

export default memo(Instructions);
