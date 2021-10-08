import Head from "next/head";
import Nav from "../../../components/nav";
import fetcher from "../../../utils/fetcher";
import PublicationsComponent from "../../../components/publications";
import MiniSocial from "../../../components/mini-social";

export async function getStaticPaths() {
  const publicationTypes = [
    "walkthroughs",
    "courses",
    "sdk",
    "implementations",
    "resources",
  ];

  const paths = publicationTypes.map((type) => {
    return { params: { publicationType: type } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const publications = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/publications/${params.publicationType}`
  );

  return {
    props: { publications, type: params.publicationType }, // will be passed to the page component as props
    revalidate: 300,
  };
}

export default function Publications({ publications, type }) {
  return (
    <div>
      <Head>
        <title>SolDev</title>
        <meta name="description" content="SolDev" />
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
