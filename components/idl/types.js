import { memo } from 'react';

function renderArguments(type) {
  let component = [];

  if (type.fields) {
    const args = type.fields;
    for (let i = 0; i < args.length; i++) {
      let type = '';

      if (args[i].type.array) {
        type = `[${args[i].type.array[0]}; ${args[i].type.array[1]}]`;
      } else if (args[i].type.vec) {
        if (args[i].type.vec.defined) {
          type = `Vec<${args[i].type.vec.defined}>`;
        } else {
          type = `Vec<[${args[i].type.vec.array[0]}; ${args[i].type.vec.array[1]}]>`;
        }
      } else if (args[i].type.defined) {
        type = args[i].type.defined;
      } else if (args[i].type.option) {
        type = `Option<${args[i].type.option}>`;
      } else if (args[i].type.variant) {
      } else {
        type = args[i].type;
      }

      component.push(
        <div key={args[i].name} className="pb-1">
          <span>
            {args[i].name}:
            <span className="inline-flex items-center rounded bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800">
              `{type}`
            </span>
            {args[i].index && (
              <span className="ml-1 inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                index
              </span>
            )}
          </span>
        </div>
      );
    }
  } else if (type.variants) {
    const args = type.variants;
    for (let i = 0; i < args.length; i++) {
      let type = args[i].name;

      component.push(
        <div key={args[i].name} className="pb-1">
          <span>
            <span className="inline-flex items-center rounded bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-800">
              `{type}`
            </span>
          </span>
        </div>
      );
    }
  }

  return component;
}

function IDLTypes({ data }) {
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
                </tr>
              </thead>
              <tbody className="prose divide-y divide-gray-200 bg-white dark:divide-gray-500 dark:bg-gray-800">
                {data.map(item => (
                  <tr
                    key={item.name}
                    className="whitespace-nowrap font-mono text-sm text-gray-500 dark:text-gray-400"
                  >
                    <td className="py-4 pl-4 pr-3 sm:pl-6">
                      <span className="font-semibold dark:text-gray-300">{item.type.kind}</span>{' '}
                      {item.name}
                    </td>
                    <td className="px-3 py-4">{renderArguments(item.type)}</td>
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

export default memo(IDLTypes);
