import fetcher from "../../../../../utils/fetcher";
import Nav from "../../../../../components/nav";
import PlaylistContent from "../../../../../components/videos/playlist-content";
import Head from "next/head";
import MiniSocial from "../../../../../components/mini-social";
import verticals from "../../../../../utils/verticals";

export async function getStaticPaths() {
  // Fetch playlist for all verticals
  let playlists = [];
  for await (let vertical of verticals) {
    const data = await fetcher(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/${vertical}`
    );

    playlists.push(data);
  }

  playlists = playlists.flat();

  // Get list of all playlists
  const paths = playlists.map((playlist) => {
    return {
      params: {
        vertical: playlist.Vertical,
        playlistID: playlist.ID,
        playlist,
      },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const playlistContent = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${params.vertical}/${params.playlistID}`
  );

  return {
    props: { playlistContent }, // will be passed to the page component as props
    revalidate: 60,
  };
}

function Playlist({ playlistDetails, playlistContent }) {
  return (
    <div>
      <Head>
        <title>SolDev: Playlist</title>
        <meta name="description" content="SolDev: Playlist" />
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
              <PlaylistContent playlistContent={playlistContent} />
            </section>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <MiniSocial />
        </div>
      </Nav>
    </div>
  );
}

export default Playlist;
