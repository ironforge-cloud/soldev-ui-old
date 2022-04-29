import { memo, useId } from 'react';
import TableHeader from './table-header';
import TableRow from './table-row';

const module1 = [
  {
    title: 'Read data from the network',
    link: '/course/intro-to-reading-data'
  },
  {
    title: 'Write data to the network',
    link: '/course/intro-to-writing-data'
  },
  {
    title: 'Interact with wallets',
    link: '/course/interact-with-wallets'
  },
  {
    title: 'Serialize custom instruction data',
    link: '/course/serialize-instruction-data'
  },
  {
    title: 'Deserialize custom account data',
    link: '/course/deserialize-custom-data'
  },
  {
    title: 'Page, Order, and Filter custom account data',
    link: '/course/paging-ordering-filtering-data'
  }
];

const module2 = [
  {
    title: 'Intro to SPL',
    link: ''
  },
  {
    title: 'Token Program',
    link: ''
  },
  {
    title: 'Token Swap Program',
    link: ''
  },
  {
    title: 'NFTs with Metaplex',
    link: ''
  }
];

const module3 = [
  {
    title: 'High-level view of the network',
    link: ''
  },
  {
    title: 'Hello World from scratch',
    link: ''
  },
  {
    title: 'Rust primer',
    link: ''
  },
  {
    title: 'Debugging',
    link: ''
  }
];

const module4 = [
  {
    title: 'A more advanced program...',
    link: ''
  },
  {
    title: 'PDAs',
    link: ''
  },
  {
    title: 'CPIs',
    link: ''
  },
  {
    title: 'Handling large transactions',
    link: ''
  }
];

function Table() {
  const id = useId();
  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      <div className="">
        <TableHeader title="Client interaction with the Solana Network" subTitle="Module 1" />

        {module1.map((item, index) => {
          return <TableRow ready={true} item={item} index={index} key={id} />;
        })}
      </div>

      <div>
        <TableHeader
          title="Client interaction with the Solana Program Library"
          subTitle="Module 2"
        />

        {module2.map((item, index) => {
          return <TableRow item={item} index={index} key={id} />;
        })}
      </div>

      <div>
        <TableHeader title="Basic Solana Program Development" subTitle="Module 3" />

        {module3.map((item, index) => {
          return <TableRow item={item} index={index} key={id} />;
        })}
      </div>

      <div>
        <TableHeader title="Advanced Solana Program Development" subTitle="Module 4" />

        {module4.map((item, index) => {
          return <TableRow item={item} index={index} key={id} />;
        })}
      </div>
    </div>
  );
}

export default memo(Table);
