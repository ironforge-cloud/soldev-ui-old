import TopBar from "./topbar";
import { memo } from "react";
import Sidebar from "./sidebar";

function Nav({ children }) {
  return (
    <div>
      <div className=" w-full z-50">
        <TopBar />
      </div>

      <div className="min-h-full ">
        <div className="flex sm:pl-6 lg:pl-8 lg:gap-8 py-10">
          <div className="min-w-[190px] hidden lg:block content-between">
            <Sidebar closeMobileMenu={() => {}} />
          </div>
          <div className="w-full overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default memo(Nav);
