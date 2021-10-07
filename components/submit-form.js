export default function SubmitForm() {
  return (
    <form className="h-screen space-y-8 divide-y divide-gray-200 p-5 md:px-20 md:py-10 xl:px-44 xl:py-14 max-w-5xl">
      <div className="space-y-8">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Submit Content
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Propose new content to the platform. Submissions will be manually
              reviewed before deciding to publish them to the site.
            </p>
          </div>

          <div className="mt-6">
            <div className="">
              <label
                htmlFor="Title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={""}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="mt-6">
            <div className="">
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-700"
              >
                Full name or Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="content-url"
                className="block text-sm font-medium text-gray-700"
              >
                Content Url
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="content-url"
                  id="content-url"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
