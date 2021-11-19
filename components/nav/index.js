import React, { useState } from "react";
import PropTypes from "prop-types";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { constructSecondaryNavigationData } from "../../utils/navigation";
import { useAppState } from "../../context/AppContext";

function Nav({ children, page }) {
  const [section, setSection] = useState(page);
  const [secondaryNavigation, setSecondaryNavigation] =
    useState("Walkthroughs");
  const appState = useAppState();

  // Setting up sidebar content, vertical is needed for the URLs
  const secondaryNavigationData = constructSecondaryNavigationData(
    appState.vertical
  );

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar
        setSection={setSection}
        section={section}
        secondaryNavigationData={secondaryNavigationData}
        secondaryNavigation={secondaryNavigation}
        setSecondaryNavigation={setSecondaryNavigation}
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
