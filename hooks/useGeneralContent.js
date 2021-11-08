import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";

export default function useGeneralContent() {
  const { query, isReady } = useRouter();
  let { data } = useSWR(
    isReady && `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${query.type}`,
    fetcher
  );
  console.log(data);
  return {
    isLoading: !data,
    data,
    type: query.type,
  };
}
