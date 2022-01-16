import Link from "next/link";

export default function SubmitContentCard() {
  return (
    <Link href="/submit" passHref>
      <button
        type="button"
        className="relative block w-[400px] h-[540px] border-2 border-gray-400 dark:border-stone-600 border-dashed rounded-lg text-center hover:border-gray-400 dark:hover:border-stone-400 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="mx-auto h-12 w-12 text-gray-400 dark:text-stone-600"
          xmlns="http://www.w3.org/2000/svg"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
          />
        </svg>
        <span className="mt-2 block text font-medium text-gray-800 dark:text-stone-600">
          Add content
        </span>
      </button>
    </Link>
  );
}
