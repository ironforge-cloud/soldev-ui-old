import { CollectionIcon } from '@heroicons/react/solid';
import { AnchorProvider, Program } from '@project-serum/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { memo, useCallback, useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import AccountSelector from './account-selector';
import AccountsDataFilter from './filter';

function AccountsData({ idl, programID }) {
  const [selectedAccount, setSelectedAccount] = useState();
  const [data, setData] = useState([]);
  // Pagination
  const [accountsLength, setAccountsLength] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  // Filter
  const [option, setOption] = useState('');
  const [filter, setFilter] = useState({});

  // Initialize Anchor program
  const defineProgram = useCallback(async () => {
    try {
      const connection = new Connection(process.env.NEXT_PUBLIC_NODE_URL);

      const provider = new AnchorProvider(
        connection,
        {
          publicKey: PublicKey.default,
          signAllTransactions: undefined,
          signTransaction: undefined
        },
        { commitment: 'processed', skipPreflight: true }
      );

      return new Program(idl, programID, provider);
    } catch (e) {
      console.error('Error defining program:', e);
    }
  }, [idl, programID]);

  // Find all accounts
  const getAccounts = useCallback(
    async accountName => {
      try {
        const program = await defineProgram();

        // normalize account name
        const name = accountName.charAt(0).toLowerCase() + accountName.slice(1);

        let accountFilter = undefined;
        if (filter.offset && filter.bytes) {
          accountFilter = [
            {
              memcmp: {
                offset: Number(filter.offset),
                bytes: filter.bytes
              }
            }
          ];
        }

        // Get all accounts
        const accounts = await program.account[name].all(accountFilter);

        // Pagination
        setAccountsLength(accounts.length);
        setPages(Math.ceil(accounts.length / 10));

        return accounts.map(account => {
          return account.publicKey;
        });
      } catch (e) {
        console.log('Error:', e);
      }
    },
    [defineProgram, filter]
  );

  // Get data for selected accounts
  const getData = useCallback(
    async accountName => {
      try {
        const program = await defineProgram();

        // normalize account name
        const name = accountName.charAt(0).toLowerCase() + accountName.slice(1);
        // Check if I need to find a specific account or all accounts
        if (filter.address) {
          const data = await program.account[name].fetch(filter.address);
          setAccountsLength(1);
          setPages(1);
          return data;
        } else {
          const pks = await getAccounts(accountName);
          return await program.account[name].fetchMultiple(
            pks.slice(currentPage, currentPage + pageSize)
          );
        }
      } catch (e) {
        console.log('Error:', e);
      }
    },
    [defineProgram, getAccounts, currentPage, pageSize, filter.address]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(selectedAccount);
        setData(data);
      } catch (e) {
        console.log('Error:', e);
      }
    }

    if (selectedAccount) fetchData();
  }, [getData, selectedAccount, filter]);

  // List of accounts names to display
  const listOfAccounts = idl.accounts.map(account => account.name);

  return (
    <div>
      <div className="my-4 flex flex-col gap-4 md:flex-row">
        <div className="w-6/12">
          <AccountSelector
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            accounts={listOfAccounts}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div>
          <AccountsDataFilter
            filter={filter}
            setFilter={setFilter}
            option={option}
            setOption={setOption}
          />
        </div>
      </div>

      <div className="rounded-t-md border border-gray-300 dark:border-gray-600">
        <div className="flex justify-between bg-gray-100 py-2 px-4 dark:bg-gray-700">
          {/* Account name */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300">
            <CollectionIcon className="h-6 w-6" />
            <h5 className="tracking-wide">
              {selectedAccount ? selectedAccount : 'Select an Account'}
            </h5>
          </div>

          {/* Pagination state */}
          {selectedAccount && (
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              Showing {currentPage * pageSize} to{' '}
              {accountsLength >= pageSize ? pageSize * currentPage + pageSize : accountsLength} of{' '}
              {accountsLength} results
            </div>
          )}

          {/* Pagination actions */}
          <div className="flex justify-between sm:justify-end">
            <button
              disabled={currentPage === 0}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white
               px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed
               disabled:opacity-50 dark:border-gray-600"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="relative ml-3 inline-flex items-center
               rounded-md border border-gray-300 bg-white px-4 py-2
                text-sm font-medium text-gray-700 hover:bg-gray-50
                 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={
                currentPage === pages - 1 || !selectedAccount || pages === 0 || pages === undefined
              }
            >
              Next
            </button>
          </div>
        </div>

        <div
          className="prose min-w-full border-t font-mono prose-img:mx-auto prose-img:mt-0
           prose-img:mb-0 prose-img:max-h-[150px] prose-img:max-w-[150px] dark:border-gray-600"
        >
          <SyntaxHighlighter
            showLineNumbers
            wrapLongLines
            style={tomorrow}
            language="json"
            customStyle={{ fontSize: 15, margin: 0 }}
          >
            {JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

export default memo(AccountsData);
