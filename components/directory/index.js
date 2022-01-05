import { useState } from "react";
import DirectoryList from "./list.";
import DirectoryProject from "./project";

const directory = {
  Protocols: [
    {
      id: 1,
      name: "Mango Markets",
      logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      data: {
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus congue sem id leo rhoncus imperdiet. Praesent bibendum mauris nec urna pellentesque iaculis. Cras luctus enim vel pellentesque pulvinar. Nulla lobortis sit amet lacus et ornare. Pellentesque vulputate tortor vitae augue facilisis, vitae mollis nibh interdum. Integer quis tincidunt dolor. Quisque.",
        links: [
          {
            type: "Site",
            href: "https://url.com",
          },
          {
            type: "Discord",
            href: "https://url.com",
          },
          {
            type: "Documentation",
            href: "https://url.com",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Serum",
      logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      data: {
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget molestie massa. Fusce et nibh turpis. Praesent neque tortor, tincidunt ac molestie fermentum, ornare id ipsum. Integer quis semper diam.",
        links: [
          {
            type: "Site",
            href: "https://url.com",
          },
          {
            type: "Discord",
            href: "https://url.com",
          },
        ],
      },
    },
  ],
  Oracles: [
    {
      id: 1,
      name: "Pyth Network",
      logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      data: {
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget molestie massa. Fusce et nibh turpis. Praesent neque tortor, tincidunt ac molestie fermentum, ornare id ipsum. Integer quis semper diam.",
        links: [
          {
            type: "Site",
            href: "https://url.com",
          },
          {
            type: "Discord",
            href: "https://url.com",
          },
        ],
      },
    },
  ],
};

export default function DirectoryDashboard() {
  const [selectedProject, setSelectedProject] = useState(
    directory["Protocols"][0]
  );
  return (
    <div className="flex-1 relative z-0 flex overflow-hidden">
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
        {/* Mobile */}
        <nav
          className="flex items-start mb-2 px-4 py-3 sm:px-6 lg:px-8 lg:hidden"
          aria-label="Breadcrumb"
        >
          <h1 className="inline-flex items-center text-xl space-x-3 font-medium text-gray-900">
            <span>Directory</span>
          </h1>
        </nav>
        <DirectoryProject project={selectedProject} />
      </main>

      {/* Desktop */}
      <aside className="hidden lg:order-first lg:flex lg:flex-col flex-shrink-0 w-96 border-r border-gray-200">
        <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-medium text-gray-900">Directory</h2>
        </div>
        <DirectoryList
          directory={directory}
          setSelectedProject={setSelectedProject}
        />
      </aside>
    </div>
  );
}
