import { memo } from "react";
import { SpeakerphoneIcon } from "@heroicons/react/outline";

function Hackathon() {
  return (
    <section className="p-6 rounded-lg shadow ">
      <div className="flex-1 flex gap-2 mb-5">
        <span className="flex p-2 rounded-lg text-gray-900 dark:text-stone-200">
          <SpeakerphoneIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="flex flex-col font-medium text-gray-900 dark:text-stone-200 prose">
          <span className="text-xl">Convergence Hackathon!</span>
          <span className="text-base font-light">
            Hosted By{" "}
            <a
              className="decoration-solid decoration-2 underline-offset-4 decoration-yellow-500 text-gray-900 dark:text-stone-200"
              href="https://www.projectserum.com/"
              target="_blank"
              rel="noreferrer"
            >
              Serum
            </a>{" "}
            &{" "}
            <a
              className="decoration-solid decoration-2 underline-offset-4 decoration-pink-500 text-gray-900 dark:text-stone-200"
              href="https://wormholenetwork.com/en/"
              target="_blank"
              rel="noreferrer"
            >
              Wormhole
            </a>
          </span>
        </p>
      </div>
      <a
        href="https://serum-wormhole-hackathon.com/"
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
