import { memo, useId } from 'react';
import TableHeader from './table-header';
import TableRow from './table-row';
import { modules } from '../../utils/course-map';

function Table() {
  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      {modules.map((module, index) => {
        <div>
          <TableHeader ready title={module.title} subTitle={`Module ${index + 1}`} />

          {modules.lessons.map((item, index) => {
            return <TableRow ready item={item} index={index} key={index} />;
          })}
        </div>;
      })}
    </div>
  );
}

export default memo(Table);
