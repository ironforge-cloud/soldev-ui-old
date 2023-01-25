import { memo } from 'react';
import TableHeader from './table-header';
import TableRow from './table-row';

function Table({modules}) {

  return (
    <div className="mx-auto mt-14 mb-20 flex max-w-4xl flex-col gap-10">
      {
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
        }
      )}
    </div>
  );
}

export default memo(Table);
