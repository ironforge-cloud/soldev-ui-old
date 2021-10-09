import Nav from "../../../../../../components/nav";
import Head from "next/head";
import MiniSocial from "../../../../../../components/mini-social";
import Player from "../../../../../../components/videos/player";
import fetcher from "../../../../../../utils/fetcher";

export async function getStaticPaths() {
  // Fetch all playlists
  const playlists = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists`
  );
  // Fetch playlists content
  let contentList = [];
  for await (let playlist of playlists) {
    const content = await fetcher(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${playlist.ID}`
    );

    contentList.push(content);
  }

  // contentList was an array of arrays
  contentList = contentList.flat();

  const paths = contentList.map((content) => {
    return {
      params: { playlistID: content.PlaylistID, videoID: content.ID },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const content = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${params.playlistID}/${params.videoID}`
  );

  return {
    props: { content },
    revalidate: 300,
  };
}

function Video({ content }) {
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
              <Player content={content} />
            </section>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <MiniSocial size="2xl" />
        </div>
      </Nav>
    </div>
  );
}

export default Video;
