import {
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from "react-share";
import PropTypes from "prop-types";

export default function Share({ content }) {
  const url = `https://soldev.app/library/${content.Vertical}/${content.ContentType}/${content.SK}`;
  return (
    <div className="flex space-x-1">
      <TwitterShareButton title={content.Title} url={url}>
        <TwitterIcon size={36} round />
      </TwitterShareButton>
      <RedditShareButton title={content.Title} url={url}>
        <RedditIcon size={36} round />
      </RedditShareButton>
      <LinkedinShareButton
        title={content.Title}
        summary={content.Description}
        url={url}
      >
        <LinkedinIcon size={36} round />
      </LinkedinShareButton>
      <FacebookShareButton quote={content.Title} url={url}>
        <FacebookIcon size={36} round />
      </FacebookShareButton>
    </div>
  );
}

Share.propTypes = {
  content: PropTypes.object.isRequired,
};
