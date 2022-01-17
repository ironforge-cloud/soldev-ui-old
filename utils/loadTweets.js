// This helper function allow me to have infinity loading without having
// to build pagination in the api
import Tweet from "../components/twitter/tweet";

export default function loadTweets(tweets, tweetsAmount) {
  let size;

  if (tweets.length < tweetsAmount) {
    size = tweets.length;
  } else {
    size = tweetsAmount;
  }

  let component = [];
  for (let i = 0; i < size; i++) {
    component.push(
      <div
        key={tweets[i].id}
        className="px-6 rounded-lg shadow-lg hover:shadow-sky-500/30 dark:hover:shadow-sky-400/20 hover:bg-opacity-80 hover:opacity-95 bg-white dark:bg-gray-800"
      >
        <Tweet
          key={tweets[i].id}
          text={tweets[i].text}
          author={tweets[i].Author}
          id={tweets[i].id}
          media={tweets[i].Media}
          created_at={tweets[i].created_at}
          public_metrics={tweets[i].public_metrics}
          referenced_tweets={tweets[i].ReferencedTweets}
          pinned={tweets[i].Pinned}
        />
      </div>
    );
  }

  return component;
}
