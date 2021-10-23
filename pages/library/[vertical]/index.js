import Head from "next/head";
import Nav from "../../../components/nav";
import Videos from "../../../components/videos";
import fetcher from "../../../utils/fetcher";
import MiniSocial from "../../../components/mini-social";
import verticals from "../../../utils/verticals";

export async function getStaticPaths() {
  const paths = verticals.map((type) => {
    return { params: { vertical: type } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const playlists = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/${params.vertical}`
  );

  return {
    props: {
      playlists,
    },
    revalidate: 60, // In seconds
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

      <Nav>
        <div className="flex-1 flex items-stretch overflow-hidden gap-5 2xl:gap-7">
          <main className="flex-1 overflow-y-auto">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last bg-white rounded-lg shadow-lg border"
            >
              <Videos playlists={playlists} />
            </section>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <MiniSocial />
        </div>
      </Nav>
    </div>
  );
}
