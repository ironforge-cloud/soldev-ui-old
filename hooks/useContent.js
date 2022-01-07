import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";
import findTags from "../utils/find-tags";

export default function useContent() {
  const { query, isReady } = useRouter();

  // Default state, used if other data not present
  let badge = `&specialTags=`;
  let tag = `&tags=`;

  // If tags or badges info is presented in the URL we need to transform it
  // and send it in the request, this data is used too for some component states
  // later on.
  if (isReady) {
    if (Array.isArray(query.badge) && query.badge.length > 0) {
      const incompleteBadge = query.badge.join("&specialTags=");
      badge = "&specialTags=" + incompleteBadge;
    } else if (query.badge) {
      badge = `&specialTags=${query.badge}`;
    }

    if (Array.isArray(query.tag) && query.tag.length > 0) {
      const incompleteTags = query.tag.join("&tags=");
      tag = "&tags=" + incompleteTags;
    } else if (query.tag) {
      tag = `&tags=${query.tag}`;
    }
  }

  // Actual API request
  let { data } = useSWR(
    isReady &&
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/Solana/${query.type}?${tag}${badge}`,
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

  // Normalizing data to be used in the components
  let badgesState = [];
  let tagsState = [];

  if (query.badge && Array.isArray(query.badge)) {
    badgesState = query.badge;
  } else if (query.badge) {
    badgesState.push(query.badge);
  }

  if (query.tag && Array.isArray(query.tag)) {
    tagsState = query.tag;
  } else if (query.tag) {
    tagsState.push(query.tag);
  }

  // find all tags and badges
  const tagsList = findTags(data);

  // define content type and title
  let contentType = "";
  let title = "";
  if (isReady) {
    contentType = query.type;
    if (contentType === "threads") {
      title = "Twitter Threads";
    } else if (contentType === "spl") {
      title = "Program Library";
    } else if (contentType === "started") {
      title = "Getting Started with Solana";
    } else if (contentType === "sdk") {
      title = "SDKs & Frameworks";
    } else {
      // Capitalize the first char
      title = contentType.charAt(0).toUpperCase() + contentType.slice(1);
    }
  }

  return {
    isLoading: !data,
    data,
    selectedContent,
    badges: badgesState,
    tags: tagsState,
    tagsList,
    contentType,
    title,
  };
}
