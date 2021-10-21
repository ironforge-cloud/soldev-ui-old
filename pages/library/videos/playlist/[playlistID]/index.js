import fetcher from "../../../../../utils/fetcher";
import Nav from "../../../../../components/nav";
import PlaylistContent from "../../../../../components/videos/playlist-content";
import Head from "next/head";
import MiniSocial from "../../../../../components/mini-social";

export async function getStaticPaths() {
  const playlists = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`
  );

  // Get list of all playlists
  const paths = playlists.map((playlist) => {
    return { params: { playlistID: playlist.ID } };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const playlistContent = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${params.playlistID}`
  );
  const playlistDetails = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana/${params.playlistID}`
  );

  return {
    props: { playlistDetails, playlistContent }, // will be passed to the page component as props
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
              <PlaylistContent
                playlistDetails={playlistDetails}
                playlistContent={playlistContent}
              />
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
