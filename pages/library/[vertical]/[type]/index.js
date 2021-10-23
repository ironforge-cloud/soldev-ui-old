import Head from "next/head";
import Nav from "../../../../components/nav";
import fetch from "isomorphic-unfetch";
import PublicationsComponent from "../../../../components/publications";
import MiniSocial from "../../../../components/mini-social";
import verticals from "../../../../utils/verticals";

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

      <Nav>
        <div className="flex-1 flex items-stretch overflow-hidden gap-5 2xl:gap-7">
          <main className="flex-1 overflow-y-auto">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last bg-white rounded-lg shadow-lg border"
            >
              <PublicationsComponent publications={publications} />
            </section>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <MiniSocial />
        </div>
      </Nav>
    </div>
  );
}
