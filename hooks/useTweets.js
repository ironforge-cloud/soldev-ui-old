import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function useTweets(listID) {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/${listID}`,
    fetcher,
    {
      refreshInterval: 30000,
    }
  );

  return {
    isLoading: !data,
    data,
  };
}
