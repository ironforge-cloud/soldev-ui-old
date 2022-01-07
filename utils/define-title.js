/**
 * Define title using content type
 * @param {String} contentType
 * @param {Array} data
 * @return {string}
 */
export default function defineTitle(contentType, data = []) {
  if (contentType === "playlist") {
    return data[0].PlaylistTitle;
  } else if (contentType === "threads") {
    return "Twitter Threads";
  } else if (contentType === "spl") {
    return "Program Library";
  } else if (contentType === "started") {
    return "Getting Started with Solana";
  } else if (contentType === "sdk") {
    return "SDKs & Frameworks";
  } else {
    // Capitalize the first char
    return contentType.charAt(0).toUpperCase() + contentType.slice(1);
  }
}
