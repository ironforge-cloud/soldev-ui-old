import PropTypes from 'prop-types';
import { memo } from 'react';
import ReactPlayer from 'react-player';

function Audio({ url }) {
  return <ReactPlayer
height="50px"
width="100%"
url={url}
controls
pip
stopOnUnmount={false}
  />;
}

Audio.propTypes = {
  url: PropTypes.string.isRequired
};

export default memo(Audio);
