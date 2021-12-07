/**
 * Find all tags from an array of content
 * @param {Array} data
 * @return {Array}
 */
export default function findTags(data) {
  let tags = [];

  if (Array.isArray(data) && data.length > 0) {
    data.forEach((content) => {
      // If SpecialTag exist save it
      if (content.SpecialTag !== "" && content.SpecialTag !== "0")
        tags.push(content.SpecialTag);

      // If regular Tags save it
      if (Array.isArray(content.Tags) && content.Tags.length > 0) {
        for (let i = 0; i < content.Tags.length; i++) {
          tags.push(content.Tags[i]);
        }
      }
    });
  }

  // Delete duplicates
  const uniq = [...new Set(tags)];

  return uniq;
}
