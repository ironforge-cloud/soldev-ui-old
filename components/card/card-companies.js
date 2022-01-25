import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CardCompanies({
  id,
  name,
  logo,
  bgColor,
  description,
  status,
}) {
  return (
    <Link href={`/bounties/${id}`} passHref>
      <button
        className={classNames(
          `flex flex-col rounded-lg border h-[400px] w-[330px] border-gray-300 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800`,
          status === "active"
            ? "cursor-pointer hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 hover:opacity-95 "
            : "cursor-not-allowed opacity-30"
        )}
        disabled={status === "inactive"}
      >
        <div
          className={classNames(
            "h-[225px] w-[328px] flex justify-center rounded-t-lg",
            bgColor
          )}
        >
          <Image
            placeholder="blur"
            blurDataURL={logo}
            src={logo}
            height="100"
            width="225px"
          />
        </div>

        <div className="p-4 border-t dark:border-gray-900">
          <div className="text-2xl font-medium pb-2 text-gray-800 dark:text-gray-200">
            {name}
          </div>

          <div className="text-gray-600 dark:text-gray-300">{description}</div>
        </div>
      </button>
    </Link>
  );
}

CardCompanies.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
