import React, { useEffect } from "react";

function MiniSocial() {
  useEffect(() => {
    const anchor = document.createElement("a");
    anchor.setAttribute("class", "twitter-timeline");
    anchor.setAttribute(
      "data-chrome",
      "noheader nofooter noborders transparent"
    );
    anchor.setAttribute("data-dnt", "true");
    anchor.setAttribute(
      "href",
      "https://twitter.com/soldevapp/lists/1444990678371651585?ref_src=twsrc%5Etfw"
    );
    document.getElementsByClassName("twitter-embed")[0].appendChild(anchor);

    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.getElementsByClassName("twitter-embed")[0].appendChild(script);
  }, []);

  return (
    <aside className="hidden w-96 bg-white rounded-lg shadow-lg border overflow-hidden 2xl:block">
      <div className="mt-6 px-4">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">
          Social Timeline
        </h2>
        <section className="twitterContainer">
          <div className="twitter-embed"></div>
        </section>
      </div>
    </aside>
  );
}

export default React.memo(MiniSocial);
