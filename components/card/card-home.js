import PropTypes from 'prop-types';
import { memo } from 'react';

function CardHome({ card }) {
  return (
    <div
      key={card.title}
      className="flex h-48 flex-col justify-center overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-sky-500/30 dark:bg-gray-800 dark:hover:shadow-sky-400/20"
    >
      <div
        key={card.title}
        className="text-center text-gray-900 hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-600"
      >
        <a href={card.url} target="_blank" rel="noreferrer" className="cursor-pointer text-lg">
          {card.title}
        </a>
      </div>
    </div>
  );
}

CardHome.propTypes = {
  card: PropTypes.object.isRequired
};

export default memo(CardHome);
