import PropTypes from 'prop-types';
import { memo } from 'react';
import CardVideo from '../card/card-video';

function LatestChangelog({ data }) {
  return (
    <div>
      <CardVideo key={data.SK} content={data} mode="sidebar" editContent={() => {}} />
    </div>
  );
}

LatestChangelog.propTypes = {
  data: PropTypes.object.isRequired
};

export default memo(LatestChangelog);
