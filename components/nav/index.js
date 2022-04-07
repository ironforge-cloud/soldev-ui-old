import dynamic from "next/dynamic";
import { memo, useState } from "react";
import Banner from "./banner";
import TopBar from "./topbar";

const NavSidebar = dynamic(() => import("./nav-sidebar"));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Nav({children}) {
  const [search, setSearch] = useState(false);

  return (
    <div className={classNames(search && "min-h-[5050px] xl:min-h-[3500px]")}>
      <div className="w-full z-50">
        <TopBar setSearch={setSearch}/>
        <Banner/>
      </div>

      <div className="min-h-full">
        <div className="flex sm:pl-6 lg:pl-8 lg:gap-8 py-7">
          <div className="min-w-[190px] hidden lg:block content-between">
            <NavSidebar/>
          </div>

          <div className="w-full overflow-hidden">{!search && children}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(Nav);
