import PropTypes from "prop-types";
import Image from "next/image";
import LiveBadge from "./live-badge";
import Link from "next/link";

export default function MiniCard({ content }) {
  return (
    <Link
      href={`/library/videos/playlist/${content.PlaylistID}/${content.ID}`}
      passHref
    >
      <div>
        <div className="cursor-pointer relative transition duration-200 ease-in-out transform hover:-translate-y-2">
          {content.PlaylistID == "twitch-livestreams" && (
            <LiveBadge live={content.Live} />
          )}

          <Image
            className="rounded-lg object-cover hover:opacity-85"
            src={content.Img}
            alt={content.Title}
            width="321"
            height="180"
            quality="100"
            placeholder="blur"
            blurDataURL={content.Img}
          />
        </div>
        <h3 className="text-sm leading-5 text-gray-500 font-medium text-center py-1 h-12 max-w-xs">
          {content.Title}
        </h3>
      </div>
    </Link>
  );
}

MiniCard.propTypes = {
  content: PropTypes.object.isRequired,
};
