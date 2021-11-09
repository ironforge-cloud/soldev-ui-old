import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";

export default function useVerticalPlaylists() {
  const { query, isReady } = useRouter();
  let { data } = useSWR(
    isReady &&
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/${query.vertical}`,
    fetcher
  );

  return {
    data,
    isLoading: !data,
    vertical: query.vertical,
  };
}
