import Link from 'next/link';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

export default function Player({ content }) {
  return (
    <div className="xs:text-xs mx-auto flex max-w-screen-3xl flex-col px-5 text-base">
      <div className="flex justify-between">
        <Link href={`/library/${content.PlaylistID}`} passHref>
          <p className="text-md cursor-pointer pb-4 text-sky-600 hover:text-sky-700 hover:underline lg:text-lg">
            {content.PlaylistID && <>&larr; Back to Playlist</>}
          </p>
        </Link>

        <a href={content.Url} target="_blank" rel="noreferrer">
          <p className="text-md pb-4 text-sky-600 hover:text-sky-700 hover:underline lg:text-lg">
            Watch in Youtube &rarr;{' '}
          </p>
        </a>
      </div>

      <div className="aspect-[16/9] w-full shadow-lg">
        <ReactPlayer
          height="100%"
          width="100%"
          style={{ aspectRatio: '16/9' }}
          url={content.Url}
          controls
          pip
          stopOnUnmount={false}
        />
      </div>

      <div className="prose mt-5 max-w-none">
        <h1 className="text-2xl font-medium">{content.Title}</h1>
      </div>
    </div>
  );
}

Player.propTypes = {
  content: PropTypes.object.isRequired
};
