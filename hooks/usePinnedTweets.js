import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function usePinnedTweets() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pinned`,
    fetcher
  );

  return {
    isLoading: !data,
    data,
  };
}
