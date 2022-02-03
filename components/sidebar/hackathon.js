import { memo } from "react";
import { SpeakerphoneIcon } from "@heroicons/react/outline";

function Hackathon() {
  return (
    <section className="p-6 rounded-lg shadow ">
      <div className="flex-1 flex gap-2 mb-5">
        <span className="flex p-2 rounded-lg text-gray-900 dark:text-gray-200">
          <SpeakerphoneIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="flex flex-col font-medium text-gray-900 dark:text-gray-200 prose">
          <span className="text-xl">Hackathon: Solana Riptide</span>
          <span className="text-base font-light">February 2 - March 17</span>
        </p>
      </div>
      <a
        href="https://solana.com/riptide"
        className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-md font-medium bg-gradient-to-r hover:from-green-400 hover:to-blue-500 from-yellow-500 to-pink-500"
        target="_blank"
        rel="noreferrer"
      >
        Learn more
      </a>
    </section>
  );
}

export default memo(Hackathon);
