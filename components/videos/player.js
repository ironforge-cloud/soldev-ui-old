import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Player({ content }) {
  return (
    <div className="xs:text-xs mx-auto flex max-w-screen-3xl flex-col px-5 text-base">
      <div className="flex justify-between">
        <Link
href={`/library/${content.PlaylistID}`}
passHref>
          <p className="text-md cursor-pointer pb-4 text-sky-600 hover:text-sky-700 hover:underline lg:text-lg">
            {content.PlaylistID && <>&larr; Back to Playlist</>}
          </p>
        </Link>

        <a
href={content.Url}
target="_blank"
rel="noreferrer"
        >
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

      <div className="self-start md:text-lg">
        <h1 className="font-medium text-gray-800 dark:text-gray-200 sm:mt-4 xl:text-xl 3xl:text-2xl">
          {content.Title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 sm:mt-4">{content.Description}</p>
      </div>
    </div>
  );
}

Player.propTypes = {
  content: PropTypes.object.isRequired
};
