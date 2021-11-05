import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";

export default function useVideo() {
  const { query, isReady } = useRouter();
  let { data } = useSWR(
    isReady &&
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${query.vertical}/${query.playlistID}/${query.videoID}`,
    fetcher
  );

  return {
    data,
  };
}
