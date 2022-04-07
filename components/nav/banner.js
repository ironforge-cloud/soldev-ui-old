import Link from "next/link"
import { memo } from "react"

function Banner() {
  return (
    <div className="relative bg-indigo-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">We announced a new product!</span>
            <span
              className="hidden md:inline">Big news! New Jobs board powered by Superteam Crypto Jobs.</span>
            <span className="block sm:ml-2 sm:inline-block">
              <Link href="/jobs" passHref>
                <a className="text-white font-bold underline">
                  {' '}
                  Check it out! <span aria-hidden="true">&rarr;</span>
                </a>

              </Link>
            </span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default memo(Banner)