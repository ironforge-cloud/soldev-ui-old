import Image from 'next/image';
import PropTypes from 'prop-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CardCompanies({ id, name, logo, bgColor, description, status, url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" key={id}>
      <button
        className={classNames(
          `flex h-[400px] w-[330px] flex-col rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800`,
          status === 'active'
            ? 'cursor-pointer hover:opacity-95 hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 '
            : 'cursor-not-allowed opacity-30'
        )}
        disabled={status === 'inactive'}
      >
        <div
          className={classNames('flex h-[225px] w-[328px] justify-center rounded-t-lg', bgColor)}
        >
          <Image
            placeholder="blur"
            alt="company logo"
            blurDataURL={logo}
            src={logo}
            height="100"
            width="225px"
          />
        </div>

        <div className="border-t p-4 dark:border-gray-900">
          <div className="pb-2 text-2xl font-medium text-gray-800 dark:text-gray-200">{name}</div>

          <div className="text-gray-600 dark:text-gray-300">{description}</div>
        </div>
      </button>
    </a>
  );
}

CardCompanies.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};
