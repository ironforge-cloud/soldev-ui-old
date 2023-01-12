import { memo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Instructions = dynamic(() => import('./idl/instructions'));
const Accounts = dynamic(() => import('./idl/accounts'));
const Errors = dynamic(() => import('./idl/errors'));
const Events = dynamic(() => import('./idl/events'));
const Types = dynamic(() => import('./idl/types'));
const Constants = dynamic(() => import('./idl/constants'));

const tabs = [
  { name: 'Instructions' },
  { name: 'Accounts' },
  { name: 'Types' },
  { name: 'Errors' },
  { name: 'Constants' },
  { name: 'Events' },
  { name: 'Raw' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function IdlViewer({ data }) {
  const router = useRouter();

  const selectedTab = router.query.idl || 'Instructions';

  return (
    <div className="my-4">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500"
          defaultValue={tabs.find(tab => tab.name === selectedTab).name}
          value={selectedTab}
          onChange={e =>
            router.push(`/registry/${router.query.address}?tab=IDL&idl=${e.target.value}`)
          }
        >
          {tabs.map(tab => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex gap-2" aria-label="Tabs">
          {tabs.map(tab => (
            <div className={classNames(tab.name === 'Raw' && 'ml-auto mr-2')} key={tab.name}>
              {tab.name !== 'Raw' ? (
                <button
                  onClick={() => {
                    router.push(`/registry/${router.query.address}?tab=IDL&idl=${tab.name}`);
                  }}
                  disabled={!(tab.name.toLowerCase() in data)}
                  className={classNames(
                    tab.name === selectedTab
                      ? 'bg-sky-400 text-gray-500 dark:bg-sky-500 dark:text-gray-900'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-300',
                    'rounded-md px-3 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:text-gray-300 disabled:dark:text-gray-700'
                  )}
                  aria-current={tab.name === selectedTab ? 'page' : undefined}
                >
                  {tab.name}
                </button>
              ) : null}
            </div>
          ))}
        </nav>
      </div>
      {selectedTab === 'Instructions' && <Instructions data={data.instructions} />}
      {selectedTab === 'Accounts' && <Accounts data={data.accounts} />}
      {data.errors && selectedTab === 'Errors' && <Errors data={data.errors} />}
      {data.types && selectedTab === 'Types' && <Types data={data.types} />}
      {data.events && selectedTab === 'Events' && <Events data={data.events} />}
      {data.events && selectedTab === 'Constants' && <Constants data={data.constants} />}
    </div>
  );
}
export default memo(IdlViewer);
