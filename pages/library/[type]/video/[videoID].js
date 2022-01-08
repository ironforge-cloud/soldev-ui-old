import Head from "next/head";
import fetcher from "../../../../utils/fetcher";
import dynamic from "next/dynamic";

const Player = dynamic(() => import("../../../../components/videos/player"));

export async function getStaticPaths() {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/Solana`
  );

  // Fetch playlist content
  let contentList = [];
  for await (let playlist of data) {
    const content = await fetcher(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${playlist.Vertical}/${playlist.ID}`
    );

    contentList.push(content);
  }

  // contentList was an array of arrays
  contentList = contentList.flat();

  const paths = contentList.map((content) => {
    return {
      params: {
        type: content.PlaylistID,
        videoID: content.SK,
      },
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${params.type}/${params.videoID}`
  );

  return {
    props: { data },
    revalidate: 300,
  };
}

function VideoID({ data }) {
  return (
    <div>
      <Head>
        <title>{`SolDev - ${data.Title}`}</title>
        <meta name="title" content={`SolDev - ${data.Title}`} />
        <meta name="description" content={data.Description} />

        {/* Google */}
        <meta name="robot" content="index,follow,noodp" />
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.soldev.app/library/${data.PlaylistID}/video/${data.SK}`}
        />
        <meta name="og:title" content={`SolDev - ${data.Title}`} />
        <meta name="og:description" content={data.Description} />
        <meta property="og:image" content={data.Img} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@soldevapp" />
        <meta name="twitter:creator" content="@italoacasas" />
        <meta
          property="twitter:url"
          content={`https://www.soldev.app/library/${data.PlaylistID}/video/${data.SK}`}
        />
        <meta property="twitter:title" content={`SolDev - ${data.Title}`} />
        <meta property="twitter:description" content={data.Description} />
        <meta property="twitter:image" content={data.Img} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Player content={data} />
    </div>
  );
}

export default VideoID;
