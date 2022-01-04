// This helper function allow me to have infinity loading without having
// to build pagination in the api
import Tweet from "../components/twitter/tweet";

export default function loadTweets(tweets, loadMore) {
  let size = 0;
  // If there are enough tweets we load 10, if not we load array.length
  if (Array.isArray(tweets) && tweets.length > 0) {
    tweets.length >= loadMore ? (size = 10) : (size = tweets.length);
  }

  // if loadMore then we want to render all the tweets
  if (loadMore) size += 10;

  let component = [];
  for (let i = 0; i < size; i++) {
    component.push(
      <div
        key={tweets[i].id}
        className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-6 shadow-lg rounded-lg"
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
