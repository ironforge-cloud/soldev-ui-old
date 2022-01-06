import Image from "next/image";
import Link from "next/link";

export default function DirectoryProject({ project }) {
  return (
    <section className="mx-4 lg:mx-6 p-6 space-y-8 bg-white dark:bg-stone-800 dark:text-white rounded-lg shadow-lg">
      <div className="w-full flex items-center space-x-4">
        <Image
          className="inline-block h-14 w-14 rounded-full"
          src={project.Logo}
          height="96px"
          width="96px"
          alt=""
        />
        <h1 className="text-xl font-semibold text-gray-900 dark:text-stone-200">
          {project.Name}
        </h1>
      </div>
      <div>
        <h2 className="text-lg font-bold text-green-400">About</h2>
        <p className="dark:text-stone-400">{project.About}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {project.Links.map((link, i) => (
          <div key={`${project.Name}-link-${i}`}>
            <h2 className="text-lg font-bold text-green-400">{link.type}</h2>
            <a
              href={link.href}
              className="hover:underline dark:text-stone-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.href}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
