import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

const Hackathon = dynamic(() => import('./hackathon'));
const LatestChangelog = dynamic(() => import('./latestChangelog'));
const LatestNewsletter = dynamic(() => import('./latestNewsletter'));

function Sidebar({ latestChangelog, latestNewsletter }) {
  return (
    <div className="flex flex-col gap-6">
      {/*<div className="rounded-lg bg-white shadow dark:bg-gray-800">*/}
      {/*  <Hackathon />*/}
      {/*</div>*/}

      <LatestNewsletter data={latestNewsletter} />
      <LatestChangelog data={latestChangelog} />
    </div>
  );
}

Sidebar.propTypes = {
  latestChangelog: PropTypes.object.isRequired,
  latestNewsletter: PropTypes.object.isRequired
};

export default memo(Sidebar);
