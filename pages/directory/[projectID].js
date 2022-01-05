import Head from "next/head";
import dynamic from "next/dynamic";

const DirectoryDashboard = dynamic(() => import("../../components/directory"));

const directory = [
  {
    Name: "Protocols",
    Projects: [
      {
        Title: "Mango Markets",
        ID: "mango",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        Title: "Raydium",
        ID: "raydium",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        Title: "Serum",
        ID: "serum",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        Title: "Quarry Protocols",
        ID: "quarry",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    Name: "RPC Providers",
    Projects: [
      {
        Title: "Triton",
        ID: "triton",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        Title: "GenesysGO",
        ID: "genesys",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    Name: "Oracles",
    Projects: [
      {
        Title: "Pyth Network",
        ID: "pyth",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        Title: "Chainlink",
        ID: "chainlink",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    Name: "Program Library",
    Projects: [
      {
        Title: "Yield Farming",
        ID: "yield",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        Title: "Name Service",
        ID: "sns",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        Title: "Token Lending",
        ID: "lending",
        Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];

const projects = {
  mango: {
    Name: "Mango Markets",
    Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ID: "mango",
    About: "long text",
    Links: [
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
  triton: {
    Name: "Triton",
    Logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    ID: "triton",
    About: "a very very long description",
    Links: [
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
};

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
