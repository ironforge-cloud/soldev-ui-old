import Head from "next/head";
import dynamic from "next/dynamic";

import { directory, projects } from "./data.temp";

const DirectoryDashboard = dynamic(() => import("../../components/directory"));

export default function DirectoryProject({ project, directory }) {
  return (
    <>
      <Head>
        <title>SolDev: Directory</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DirectoryDashboard project={project} directory={directory} />
    </>
  );
}

export async function getStaticPaths() {
  //   const res = await fetch("https://.../posts");
  //   const posts = await res.json();

  let paths = [];
  directory.forEach((type) => {
    type.Projects.forEach((p) => {
      paths.push({ params: { projectID: p.ID } });
    });
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()

  const project = projects[params.projectID];

  return { props: { project, directory } };
}
