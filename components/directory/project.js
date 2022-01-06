import Image from "next/image";
import Link from "next/link";

export default function DirectoryProject({ project }) {
  return (
    <section className="mx-4 lg:mx-6 p-6 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="w-full flex items-center space-x-4">
        <Image
          className="inline-block h-14 w-14 rounded-full"
          src={project.Logo}
          height="96px"
          width="96px"
          alt=""
        />
        <h1 className="text-xl font-semibold">{project.Name}</h1>
      </div>
      <div>
        <h2 className="text-lg font-medium">About</h2>
        <p>{project.About}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        {project.Links.map((link, i) => (
          <div key={`${project.Name}-link-${i}`}>
            <h2 className="text-lg font-medium">{link.type}</h2>
            <a
              href={link.href}
              className="hover:underline"
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
