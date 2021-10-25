import PropTypes from "prop-types";
import Image from "next/image";
import LiveBadge from "./live-badge";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MiniCard({ content }) {
  const router = useRouter();
  const { vertical } = router.query;
  return (
    <Link
      href={`/library/${vertical}/playlist/${content.PlaylistID}/${content.ID}`}
      passHref
    >
      <div>
        <div className="cursor-pointer relative transition duration-200 ease-in-out transform-gpu hover:-translate-y-2">
          {content.SK == "livestream" && <LiveBadge live={content.Live} />}

          <Image
            className="rounded-lg object-cover hover:opacity-85"
            src={content.Img}
            alt={content.Title}
            height="180"
            width="320"
            quality="100"
            placeholder="blur"
            blurDataURL={content.Img}
          />
        </div>
        <h3 className="text-sm leading-5 text-gray-500 font-medium text-center h-12 max-w-xs">
          {content.Title}
        </h3>
      </div>
    </Link>
  );
}

MiniCard.propTypes = {
  content: PropTypes.object.isRequired,
};
