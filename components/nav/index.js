import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import NavPromotion from './nav-promotion';
import TopBar from './topbar';

const NavSidebar = dynamic(() => import('./nav-sidebar'));

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Nav({ children }) {
  const [search, setSearch] = useState(false);

  return (
    <div className={classNames(search && 'min-h-[5050px] xl:min-h-[3500px]', 'min-h-screen')}>
      <div className="z-50 w-full">
        <TopBar setSearch={setSearch} />
        <NavPromotion />
      </div>

      <div className="min-h-full">
        <div className="flex py-7 sm:pl-6 lg:gap-8 lg:pl-8">
          <div className="hidden min-w-[190px] content-between lg:block">
            <NavSidebar />
          </div>

          <div className="min-h-screen w-full overflow-x-hidden overflow-y-visible">
            {!search && children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Nav);
