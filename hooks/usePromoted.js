import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function usePromoted() {
  let { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/promoted`,
    fetcher
  );

  return {
    data,
    isLoading: !error && !data,
  };
}
