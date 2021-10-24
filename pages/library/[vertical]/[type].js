import Head from "next/head";
import fetch from "isomorphic-unfetch";
import PublicationsComponent from "../../../components/publications";
import verticals from "../../../utils/verticals";

export async function getStaticPaths() {
  const publicationTypes = [
    "walkthroughs",
    "courses",
    "sdk",
    "implementations",
    "resources",
    "tools",
  ];

  const paths = [];
  verticals.forEach((vertical) => {
    publicationTypes.forEach((type) => {
      paths.push({ params: { vertical, type } });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Get all content by vertical and type
  const publications = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${params.vertical}/${params.type}`
  );

  let data;
  try {
    data = await publications.json();
  } catch (error) {
    data = [];
  }

  return {
    props: { publications: data, type: params.type }, // will be passed to the page component as props
    revalidate: 300,
  };
}

export default function Publications({ publications, type }) {
  return (
    <div>
      <Head>
        <title>SolDev: Publications</title>
        <meta name="description" content="SolDev: Publications" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PublicationsComponent publications={publications} />
    </div>
  );
}
