import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function usePinnedTweets() {
  const { data } = useSWR("/api/pinned-tweets", fetcher);

  return {
    isLoading: !data,
    data,
  };
}
