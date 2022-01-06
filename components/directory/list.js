import Image from "next/image";
import Link from "next/link";

export default function DirectoryList({ directory }) {
  const TypeHeader = ({ children }) => {
    return (
      <div className="z-10 top-0 bg-green-400 text-white font-medium text-sm px-6 py-1 rounded-lg mx-2 shadow-lg">
        {children}
      </div>
    );
  };

  const ProjectListItem = ({ project }) => {
    return (
      <li>
        <Link href={`/directory/${project.ID}`} passHref>
          <a>
            <div className="relative px-6 py-3 mx-2 my-4 flex items-center space-x-3 bg-white hover:bg-gray-100 rounded-md shadow-md ">
              <Image
                className="h-10 w-10 rounded-full"
                src={project.Logo}
                height="48px"
                width="48px"
                alt={`${project.Name}-logo`}
              />
              <div className="flex-1 min-w-0">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="font-medium text-gray-900">{project.Title}</p>
              </div>
            </div>
          </a>
        </Link>
      </li>
    );
  };

  return (
    <nav className="flex-1 h-full overflow-y-auto" aria-label="Directory">
      {directory.map((type) => (
        <div key={type.Name} className="relative">
          <TypeHeader>
            <h3>{type.Name}</h3>
          </TypeHeader>
          <ul role="list" className="relative z-0">
            {type.Projects.map((project) => (
              <ProjectListItem project={project} key={project.ID} />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
