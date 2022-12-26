import { ExternalLinkIcon, SpeakerphoneIcon } from '@heroicons/react/outline';
import { memo } from 'react';

function NavPromotion() {
  return (
    <div className="bg-sky-800">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-sky-800 p-2">
              <SpeakerphoneIcon
className="h-6 w-6 text-sky-50"
aria-hidden="true"
              />
            </span>
            <p className="ml-3 truncate font-medium text-sky-50">
              <span className="lg:hidden">We announced a new product!</span>
              <span className="hidden lg:inline">
                Big news! We&apos;re excited to announce Ironforge, a new product that will simplify
                your Solana development experience
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="https://www.ironforge.cloud/?utm_source=soldev.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 rounded-md border border-transparent bg-gray-50 px-4 py-2 text-sm font-medium text-sky-600 shadow-sm hover:bg-sky-50"
            >
              <ExternalLinkIcon
className="h-4 w-4"
aria-hidden="true"
              />
              ironforge.cloud
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <div
type="button"
className="flex p-2 "
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(NavPromotion);
