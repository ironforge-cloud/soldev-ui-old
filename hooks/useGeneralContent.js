import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";

export default function useGetContentByStatus() {
  const { query, isReady } = useRouter();
  let { data } = useSWR(
    isReady && `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${query.type}`,
    fetcher
  );

  return {
    isLoading: !data,
    data,
    type: query.type,
  };
}
