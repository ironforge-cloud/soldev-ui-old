import useSWR from "swr";
import fetcher from "../utils/fetcher";
import fetch from "isomorphic-unfetch";

export default function useSubmitted(status) {
  let { data = [], error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${status}`,
    fetcher
  );

  if (error || data === null) data = [];

  return {
    submittedData: data,
    isLoading: !error && !data,
    isError: error,
  };
}
