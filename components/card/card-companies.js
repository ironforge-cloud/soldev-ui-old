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
}) {
  return (
    <Link href={`/bounties/${id}`}>
      <div className="cursor-pointer flex flex-col rounded-lg border h-[400px] w-[330px] border-gray-300 dark:border-stone-700/60 shadow-lg hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20hover:opacity-95 bg-white dark:bg-gray-800">
        <div
          className={classNames(
            "h-[225px] w-[328px] flex justify-center rounded-t-lg",
            bgColor
          )}
        >
          <Image src={logo} height="34px" width="205px" />
        </div>

        <div className="p-4 border-t-2 dark:border-gray-800">
          <div className="text-2xl font-medium pb-2 text-gray-800 dark:text-gray-200">
            {name}
          </div>

          <div className="text-gray-600 dark:text-gray-300">{description}</div>
        </div>
      </div>
    </Link>
  );
}

CardCompanies.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
