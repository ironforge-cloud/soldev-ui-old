import DirectoryList from "./list";
import DirectoryProject from "./project";

export default function DirectoryDashboard({ project, directory }) {
  return (
    <div className="w-full h-full flex-1 absolute z-0 flex overflow-hidden">
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
        {/* Mobile */}
        {/* <nav
          className="flex items-start mb-2 px-4 py-3 sm:px-6 lg:px-8 lg:hidden"
          aria-label="Breadcrumb"
        >
          <h1 className="inline-flex items-center text-xl space-x-3 font-medium text-gray-900">
            <span>Directory</span>
          </h1>
        </nav> */}
        <DirectoryProject project={project} />
      </main>

      {/* Desktop */}
      <aside className="hidden h-full overflow-hidden lg:order-first lg:flex lg:flex-col flex-shrink-0 w-96 border-r pr-4 border-gray-200 dark:border-stone-500">
        {/* <div className="px-6 pt-6 pb-4">
          <h2 className="text-lg font-medium text-gray-900">Directory</h2>
        </div> */}
        <DirectoryList directory={directory} />
      </aside>
    </div>
  );
}
