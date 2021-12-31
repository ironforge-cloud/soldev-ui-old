import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function useBadge(badge) {
  let specialTag = "New";

  if (badge === "New") specialTag = "New";
  if (badge === "Trending") specialTag = "Hot";

  let { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/specialtag/${specialTag}`,
    fetcher
  );

  return {
    isLoading: !data,
    data,
  };
}
