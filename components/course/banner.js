import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import { memo } from 'react';

function CourseBanner() {
  return (
    <div className=" mx-auto mt-10 max-w-2xl rounded-xl bg-teal-600">
      <div className="mx-auto py-3 px-3 sm:px-5 lg:px-6">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="font-medium text-white">
            <span className="">
              The course is being made publicly available by
              <a
                href="https://twitter.com/jamesrp13"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-white hover:underline"
              >
                {' '}
                James
              </a>{' '}
              and others. If you'd like to help out, have a look how you can
            </span>
            <span className="">
              <a
                href="https://github.com/Unboxed-Software/solana-course"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-white hover:underline"
              >
                {' '}
                Contribute <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(CourseBanner);
