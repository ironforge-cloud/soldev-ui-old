import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";

export default function useList() {
  const { query, isReady } = useRouter();

  let { data } = useSWR(
    isReady &&
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/lists/${query.listName}`,
    fetcher
  );

  // TODO: fix this in the api
  if (data == null) data = [];

  return {
    isLoading: !data,
    data,
    type: query.listName,
  };
}
