import Image from "next/image";
import Link from "next/link";

export default function DirectoryList({ directory }) {
  return (
    <nav className="flex-1 h-full overflow-y-auto" aria-label="Directory">
      {directory.map((type) => (
        <div key={type.Name} className="relative">
          <div className="z-10 top-0 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
            <h3>{type.Name}</h3>
          </div>
          <ul role="list" className="relative z-0 divide-y divide-gray-200">
            {type.Projects.map((project) => (
              <Link href={`/directory/${project.ID}`} key={project.ID} passHref>
                <a>
                  <li>
                    <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500">
                      <div className="flex-shrink-0">
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={project.Logo}
                          height="64px"
                          width="64px"
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <a href="#" className="focus:outline-none">
                          {/* Extend touch target to entire panel */}
                          <span
                            className="absolute inset-0"
                            aria-hidden="true"
                          />
                          <p className="font-medium text-gray-900">
                            {project.Title}
                          </p>
                        </a>
                      </div>
                    </div>
                  </li>
                </a>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
