import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ArchiveIcon,
  BeakerIcon,
  ChatAlt2Icon,
  ChipIcon,
  FolderIcon,
  PencilAltIcon,
  TerminalIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";

function constructSecondaryNavigationData(vertical) {
  return {
    Library: [
      {
        name: "Videos",
        href: "/",
        icon: VideoCameraIcon,
        disabled: false,
      },
      {
        name: "SDKs & Frameworks",
        href: `/library/${vertical}/sdk`,
        icon: TerminalIcon,
        disabled: false,
      },
      {
        name: "Resources",
        href: `/library/${vertical}/resources`,
        icon: FolderIcon,
        disabled: false,
      },
      {
        name: "Courses",
        href: `/library/${vertical}/courses`,
        icon: PencilAltIcon,
        disabled: false,
      },

      {
        name: "Walkthroughs",
        href: `/library/${vertical}/walkthroughs`,
        icon: ArchiveIcon,
        disabled: false,
      },
      {
        name: "Implementations",
        href: `/library/${vertical}/implementations`,
        icon: BeakerIcon,
        disabled: false,
      },
      {
        name: "Tools",
        href: `/library/${vertical}/tools`,
        icon: ChipIcon,
        disabled: false,
      },
    ],
    Community: [
      { name: "Developer Community", href: "/community", icon: ChatAlt2Icon },
      { name: "Solana Support", href: "/community", icon: ChatAlt2Icon },
      { name: "SOLHACK", href: "/community", icon: ChatAlt2Icon },
      { name: "Metaplex", href: "/community", icon: ChatAlt2Icon },
      { name: "Anchor", href: "/community", icon: ChatAlt2Icon },
    ],
  };
}

function Nav({ children, page }) {
  const [section, setSection] = useState(page);
  const [secondaryNavigation, setSecondaryNavigation] = useState("Videos");
  const router = useRouter();
  const { vertical } = router.query;

  const secondaryNavigationData = constructSecondaryNavigationData(vertical);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Navbar
        setSection={setSection}
        section={section}
        secondaryNavigationData={secondaryNavigationData}
        secondaryNavigation={secondaryNavigation}
        setSecondaryNavigation={setSecondaryNavigation}
      />
      <div className="py-5 sm:px-6 lg:pr-0 lg:pl-4 flex">
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
