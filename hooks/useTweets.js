import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function useTweets() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets`,
    fetcher
  );

  return {
    isLoading: !data,
    data,
  };
}
