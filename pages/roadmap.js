import Head from "next/head";
import Nav from "../components/nav";
import {
  CakeIcon,
  ClockIcon,
  PencilIcon,
  VideoCameraIcon,
  MicrophoneIcon,
  AnnotationIcon,
  CollectionIcon,
  BookmarkAltIcon,
  BellIcon,
  InboxIcon,
  CalendarIcon,
} from "@heroicons/react/solid";
import MiniSocial from "../components/mini-social";

const timeline = [
  {
    id: 1,
    title: "Library Section MVP",
    icon: CakeIcon,
    details:
      "The Library section allows developers to find and consume content, frameworks, and SDKs.",
    iconBackground: "bg-green-500",
  },
  {
    id: 2,
    title: "Live Stream",
    icon: VideoCameraIcon,
    details: "Youtube and Twitch live streams will be posted on the Platform.",
    iconBackground: "bg-yellow-500",
  },
  {
    id: 3,
    title: "Content tags and some leftovers",
    details:
      "All types of content will contain Tags for easier usage. An example of these tags will be Solana Fundamentals or Rust.",
    icon: PencilIcon,
    iconBackground: "bg-gray-500",
  },
  {
    id: 3,
    title: "Podcasts Content",
    details:
      "Podcasts will be very similar to how the Video sub-session is currently working.",
    icon: MicrophoneIcon,
    iconBackground: "bg-gray-500",
  },
  {
    id: 4,
    title: "Social Networks Feed",
    details:
      "A feed with essential posts in social networks, including Github and Discord.",
    icon: AnnotationIcon,
    iconBackground: "bg-gray-500",
  },
  {
    id: 12,
    title: "Submit content",
    details: "Add the ability to submit content to the platform.",
    icon: CollectionIcon,
    iconBackground: "bg-gray-500",
  },
  {
    id: 5,
    title: "Projects Directory",
    details:
      "A directory of projects in the Solana ecosystem, with the ability to filter by type of project.",
    icon: BookmarkAltIcon,
    iconBackground: "bg-gray-500",
  },
  {
    id: 7,
    title: "Calendar",
    details:
      "A Calendar with coming Live Streams, Hackathon, Podcasts, or any event the developer community should be aware of.",
    icon: CalendarIcon,
    iconBackground: "bg-gray-500",
  },
  {
    id: 8,
    title: "Jobs Board ",
    details:
      "Job Board with the ability for users to submit a request for building a team for an idea or a hackathon.",
    icon: BookmarkAltIcon,
    iconBackground: "bg-gray-500",
  },
  {
    id: 10,
    title: "User Profile and Notifications",
    details:
      "User Profile and Notifications about new content, events, or live streams.",
    icon: BellIcon,
    iconBackground: "bg-gray-500",
  },
  {
    id: 11,
    title: "Newsletter",
    details:
      "The newsletter management section will provide a way for developers to be up-to-day with new content or events on a weekly/monthly basis.",
    icon: InboxIcon,
    iconBackground: "bg-gray-500",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FAQ() {
  return (
    <div>
      <Head>
        <title>SolDev</title>
        <meta name="description" content="SolDev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav>
        <div className="flex-1 flex items-stretch overflow-hidden gap-6">
          <main className="flex-1 overflow-y-auto">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="min-w-0 flex-1 h-full flex justify-center flex-coloverflow-hidden xl:order-last bg-white rounded-lg shadow-lg border"
            >
              <div className="flow-root py-10 px-4">
                <ul role="list" className="-mb-8">
                  {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                event.iconBackground,
                                "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                              )}
                            >
                              <event.icon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-lg font-semibold text-gray-900">
                                {event.title}
                              </p>
                              <p className="mt-3 text-base text-gray-500 max-w-lg">
                                {event.details}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>

          {/* Secondary column (hidden on smaller screens) */}
          <MiniSocial />
        </div>
      </Nav>
    </div>
  );
}
