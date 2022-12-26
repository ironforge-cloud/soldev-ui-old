import PropTypes from 'prop-types';
import { memo } from 'react';
import CardRegular from '../card/card-regular';

function LatestNewsletter({ data }) {
  return (
    <div>
      <CardRegular
key={data.SK}
content={data}
mode="search"
editContent={() => {}}
      />
    </div>
  );
}

LatestNewsletter.propTypes = {
  data: PropTypes.object.isRequired
};

export default memo(LatestNewsletter);
