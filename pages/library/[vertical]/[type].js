import Head from "next/head";
import fetch from "isomorphic-unfetch";
import PublicationsComponent from "../../../components/publications";
import verticals from "../../../utils/verticals";
import contentTypes from "../../../utils/content-types";

export async function getStaticPaths() {
  const paths = [];
  verticals.forEach((vertical) => {
    contentTypes.forEach((type) => {
      paths.push({ params: { vertical, type } });
    });
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Get all content by vertical and type
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${params.vertical}/${params.type}?status=active`
  );

  let publications;
  try {
    publications = await data.json();
  } catch (error) {
    publications = [];
  }

  return {
    props: { publications, type: params.type }, // will be passed to the page component as props
    revalidate: 30, // In seconds
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

      <PublicationsComponent publications={publications} type={type} />
    </div>
  );
}
