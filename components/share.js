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
  return (
    <>
      <TwitterShareButton title={content.Title} url={"https://soldev.app"}>
        <TwitterIcon size={36} round />
      </TwitterShareButton>
      <RedditShareButton title={content.Title} url={"https://soldev.app"}>
        <RedditIcon size={36} round />
      </RedditShareButton>
      <LinkedinShareButton title={content.Title} url={"https://soldev.app"}>
        <LinkedinIcon size={36} round />
      </LinkedinShareButton>
      <FacebookShareButton quote={content.Title} url={"https://soldev.app"}>
        <FacebookIcon size={36} round />
      </FacebookShareButton>
    </>
  );
}

Share.propTypes = {
  content: PropTypes.object.isRequired,
};
