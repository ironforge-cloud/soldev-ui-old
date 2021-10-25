import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TweetGm() {
  return (
    <>
      <a
        className="flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-blue-500 hover:bg-blue-400"
        href="https://twitter.com/intent/tweet?text=gm"
        rel="noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={["fab", "twitter"]} size="1x" color="white" />
        <span className="ml-1">tweet gm</span>
      </a>
    </>
  );
}

{
  /* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-size="large" data-text="gm" data-via="soldevapp" data-dnt="true" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */
}
