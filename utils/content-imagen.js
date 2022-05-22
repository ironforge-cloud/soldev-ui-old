/**
 * Card Image helper function
 * @param {Object} content
 * @return {String}
 */
export default function defineImage(content) {
  if (content.Img) {
    return content.Img;
  } else if (content.ContentType === 'threads') {
    return '/twitter-placeholder.webp';
  } else if (content.Url && content.Url.includes('twitter') && content.ContentType === 'podcasts') {
    return '/twitter-placeholder.webp';
  }

  return '/placeholder.webp';
}
