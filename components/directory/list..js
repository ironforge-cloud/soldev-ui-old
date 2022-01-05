import Image from "next/image";

export default function DirectoryList({ directory, setSelectedProject }) {
  return (
    <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
      {Object.keys(directory).map((type) => (
        <div key={type} className="relative">
          <div className="z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
            <h3>{type}</h3>
          </div>
          <ul role="list" className="relative z-0 divide-y divide-gray-200">
            {directory[type].map((project) => (
              <li key={project.id} onClick={() => setSelectedProject(project)}>
                <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={project.logo}
                      height="64px"
                      width="64px"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      {/* Extend touch target to entire panel */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="font-medium text-gray-900">
                        {project.name}
                      </p>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
