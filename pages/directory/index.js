import { DatabaseIcon } from "@heroicons/react/outline";
import ProjectCard from "../../components/card/project";
import { Container } from "../../components/layout";
import fetch from "../../utils/fetcher";

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/projects`
  );

  const data = Object.entries(response).map((category) => {
    return {
      name: category[0],
      id: category[1][0].CategoryID,
      projects: category[1]
    }
  })

  console.log(data)

  return {
    props: {data},
    revalidate: 60,
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Directory({data}) {
  const metaTags = {
    title: "SolDev - Directory",
    description: "Solana directory",
    url: "https://soldev.app/directory",
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <div className="flex justify-center">
        <h1
          className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 capitalize">
          Directory
        </h1>
      </div>

      <div className="flex gap-32 m-10">
        {data.map((category) => (
          <div key={category.id}>
            <div className="flex gap-4 text-gray-700">
              <DatabaseIcon className="w-10"/>
              <h3 className="text-xl font-semibold">{category.name}</h3>
            </div>


            <div className="ml-14">
              {category.projects.map(({Project}) => (
                // TODO: Improve api response to include project id
                <ProjectCard key={Project.ProjectName} project={Project}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}