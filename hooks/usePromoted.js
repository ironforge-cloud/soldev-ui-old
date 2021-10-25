import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function usePromoted() {
  let { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/promoted`,
    fetcher
  );

  if (error) data = [];

  return {
    promoted: data,
    isLoading: !error && !data,
    isError: error,
  };
}
