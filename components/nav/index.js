import React, { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { constructSecondaryNavigationData } from "../../utils/navigation";

function Nav({ children, page }) {
  const [section, setSection] = useState(page);
  const [secondaryNavigation, setSecondaryNavigation] = useState("Videos");

  const router = useRouter();

  // Current vertical
  const { vertical } = router.query;
  // Setting up sidebar content, vertical is needed for the URLs
  const secondaryNavigationData = constructSecondaryNavigationData(vertical);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar
        setSection={setSection}
        section={section}
        secondaryNavigationData={secondaryNavigationData}
        secondaryNavigation={secondaryNavigation}
        setSecondaryNavigation={setSecondaryNavigation}
        vertical={vertical}
      />
      <div className="py-5 sm:px-6 lg:pr-1 lg:pl-4 flex">
        <Sidebar
          secondaryNavigationData={secondaryNavigationData}
          section={section}
          secondaryNavigation={secondaryNavigation}
          setSecondaryNavigation={setSecondaryNavigation}
        />
        {children}
      </div>
    </div>
  );
}

Nav.defaultProps = {
  page: "Library",
};

Nav.propTypes = {
  page: PropTypes.string,
};

export default React.memo(Nav);
