import React, { useState } from "react";
import {
  VideoCameraIcon,
  ArchiveIcon,
  BeakerIcon,
  FolderIcon,
  PencilAltIcon,
  TerminalIcon,
  ChipIcon,
  ChatAlt2Icon,
} from "@heroicons/react/outline";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

const secondaryNavigationData = {
  Library: [
    {
      name: "Videos",
      href: "/",
      icon: VideoCameraIcon,
      disabled: false,
    },
    {
      name: "SDKs & Frameworks",
      href: "/library/sdk",
      icon: TerminalIcon,
      disabled: false,
    },
    {
      name: "Resources",
      href: "/library/resources",
      icon: FolderIcon,
      disabled: false,
    },
    {
      name: "Courses",
      href: "/library/courses",
      icon: PencilAltIcon,
      disabled: false,
    },

    {
      name: "Walkthroughs",
      href: "/library/walkthroughs",
      icon: ArchiveIcon,
      disabled: false,
    },
    {
      name: "Implementations",
      href: "/library/implementations",
      icon: BeakerIcon,
      disabled: false,
    },
    {
      name: "Tools",
      href: "/library/tools",
      icon: ChipIcon,
      disabled: false,
    },
  ],
  Community: [
    { name: "SolDev", href: "/community", icon: ChatAlt2Icon },
    { name: "Solana", href: "/community", icon: ChatAlt2Icon },
    { name: "Anchor", href: "/community", icon: ChatAlt2Icon },
  ],
};

function Nav({ children }) {
  const [section, setSection] = useState("Library");
  const [secondaryNavigation, setSecondaryNavigation] = useState("Videos");

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

export default React.memo(Nav);
