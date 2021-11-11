import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";

export default function useContent() {
  const { query, isReady } = useRouter();

  // Setting up default values
  if (isReady) {
    if (!query.tag) {
      query.tag = "";
    }

    if (!query.badge) {
      query.badge = "";
    }
  }

  let { data } = useSWR(
    isReady &&
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${query.vertical}/${query.type}?status=active&tags=${query.tag}&specialTags=${query.badge}`,
    fetcher
  );

  return {
    isLoading: !data,
    data,
    type: query.type,
  };
}
