import Head from "next/head";
import Videos from "../../../components/videos";
import fetch from "isomorphic-unfetch";
import verticals from "../../../utils/verticals";

export async function getStaticPaths() {
  const paths = verticals.map((type) => {
    return { params: { vertical: type } };
  });

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/${params.vertical}`
  );

  let playlists;
  try {
    playlists = await data.json();
  } catch (error) {
    playlists = [];
  }

  return {
    props: {
      playlists,
    },
    revalidate: 5, // In seconds
  };
}

export default function Video({ playlists }) {
  return (
    <div>
      <Head>
        <title>SolDev</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Videos playlists={playlists} />
    </div>
  );
}
