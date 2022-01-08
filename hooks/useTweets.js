import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function useTweets(listID) {
  const { data } = useSWR(`api/twitter/?list=${listID}`, fetcher, {
    refreshInterval: 30000,
  });

  return {
    isLoading: !data,
    data,
  };
}
