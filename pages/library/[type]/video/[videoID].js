import fetcher from "../../../../utils/fetcher";
import { Container } from "../../../../components/layout";
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
  const metaTags = {
    title: `SolDev - ${data.Title}`,
    description: data.Description,
    url: `https://www.soldev.app/library/${data.PlaylistID}/video/${data.SK}`,
    image: "https://soldev.app/solanaLogoMark.png",
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <Player content={data} />
    </Container>
  );
}

export default VideoID;
