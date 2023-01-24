import { memo, useEffect, useState } from 'react';
import TableRow from './table-row';
import dynamic from 'next/dynamic';
import TableHeader from './table-header';

const Spinner = dynamic(() => import('../../components/spinner'));

function Table() {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchModules() {
      try {
        setIsLoading(true);

        const res = await fetch('/api/specs').then(res => res.json());

        setModules(res);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.error(err);
      }
    }
    fetchModules();
  }, []);

  return (
    <div className="mx-auto mt-14 mb-20 flex max-w-4xl flex-col gap-10">
      {!isLoading ? (
        modules.map((module, index) => {
          return (
            <div key={index}>
              <TableHeader ready title={module?.directory} />

              {module?.files.map((item, index) => {
                return (
                  <TableRow ready={item.ready ?? true} item={item} index={index} key={index} />
                );
              })}
            </div>
          );
        })
      ) : (
        <div className="mx-auto">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default memo(Table);
