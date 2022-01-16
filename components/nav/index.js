import { memo, useState } from "react";
import dynamic from "next/dynamic";
import TopBar from "./topbar";

const Sidebar = dynamic(() => import("./sidebar"));

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Nav({ children }) {
  const [search, setSearch] = useState(false);

  return (
    <div
      className={classNames(
        "min-h-screen bg-gray-100 dark:bg-stone-900",
        search && "min-h-[3850px] 3xl:min-h-[1800px]"
      )}
    >
      <div className="w-full z-50">
        <TopBar setSearch={setSearch} />
      </div>

      <div className="min-h-full">
        <div className="flex sm:pl-6 lg:pl-8 lg:gap-8 py-10">
          <div className="min-w-[190px] hidden lg:block content-between">
            <Sidebar />
          </div>

          <div className="w-full overflow-hidden">{!search && children}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(Nav);
