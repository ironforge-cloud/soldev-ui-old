import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";
import tags from "../utils/tags";

export default function useContent() {
  const { query, isReady } = useRouter();

  let badge = "";
  let tag = "";

  // Tags and Badges are similar, when I implemented this I imagine
  // I was bored and wanted to overcomplicate stuff for some-reason
  if (isReady && query.tag) {
    if (tags.badge.includes(query.tag)) {
      badge = query.tag;
    } else {
      tag = query.tag;
    }
  }

  let { data } = useSWR(
    isReady &&
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${query.type}?status=active&tags=${tag}&specialTags=${badge}`,
    fetcher
  );

  // If I have contentId in the path we need to open the
  // modal for a specific content
  let selectedContent = false;
  if (query.contentId && data) {
    for (let i = 0; i < data.length; i++) {
      // If ID doesn't match next
      if (query.contentId !== data[i].SK) continue;

      // Save content and stop loop
      selectedContent = data[i];
      break;
    }
  }

  let type;
  if (Array.isArray(data) && data.length > 0) {
    if (data[0].PlaylistTitle !== "") {
      type = data[0].PlaylistTitle;
    } else {
      type = query.type;
    }
  }

  return {
    isLoading: !data,
    data,
    type,
    selectedContent,
  };
}
