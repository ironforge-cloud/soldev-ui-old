import { memo } from 'react';
import { modules } from '../../utils/course-map';
import TableHeader from './table-header';
import TableRow from './table-row';

function Table() {
  return (
    <div className="mx-auto mt-14 mb-20 flex max-w-4xl flex-col gap-10">
      <div>
        <TableHeader ready title="Client interaction with the Solana Network" subTitle="Module 1" />

        {modules[0].map((item, index) => {
          return <TableRow ready={item.ready ?? true} item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader
          ready
          title="Client interaction with common Solana programs"
          subTitle="Module 2"
        />

        {modules[1].map((item, index) => {
          return <TableRow ready={item.ready ?? true} item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Basic Solana Program Development" subTitle="Module 3" />

        {modules[2].map((item, index) => {
          return <TableRow ready={item.ready ?? true} item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Intermediate Solana Program Development" subTitle="Module 4" />

        {modules[3].map((item, index) => {
          return <TableRow ready={item.ready ?? true} item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Anchor Program Development" subTitle="Module 5" />

        {modules[4].map((item, index) => {
          return <TableRow ready={item.ready ?? true} item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Beyond the Basics" subTitle="Module 6" />

        {modules[5].map((item, index) => {
          return <TableRow ready={false} item={item} index={index} key={index} />;
        })}
      </div>

      <div>
        <TableHeader ready title="Solana Program Security" subTitle="Module 7" />

        {modules[6].map((item, index) => {
          return <TableRow ready={item.ready ?? true} item={item} index={index} key={index} />;
        })}
      </div>
    </div>
  );
}

export default memo(Table);
