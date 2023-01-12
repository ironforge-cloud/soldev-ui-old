import dynamic from 'next/dynamic';
import { Container } from '../../components/layout';

const Searchbar = dynamic(() => import('../../components/searchbar'));

export default function Registry() {
  const metaTags = {
    title: 'SolDev - IDL Registry',
    description: 'Solana deployed IDLs',
    url: 'https://soldev.app/registry',
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="-mt-[74px] flex h-screen flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center">
          <div className="w:full sm:w-4/5 lg:w-3/5">
            <Searchbar searchButton={true} keyboardShortcut={true} />
          </div>
        </div>
        {/*<p className="sm:text:sm text-center text-xs text-gray-600 dark:text-gray-400 md:text-base">*/}
        {/*  Tip: Search for a program address, for example “HWx6Bcau9SJGcdX5PYTeFGzrhwVcFRrj2D1jadicLVkj”.*/}
        {/*</p>*/}
      </div>
    </Container>
  );
}
