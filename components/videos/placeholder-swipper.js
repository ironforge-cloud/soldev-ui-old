function PlaceholderSwipper() {
  const cards = [];
  for (let i = 0; i <= 5; i++) {
    cards.push(
      <div className="rounded-md flex-shrink-0 pr-4 pb-4 w-[360px]" key={i}>
        <div className="animate-pulse flex">
          <div className="flex-1 space-y-2">
            <div className="bg-gray-400 rounded h-48 w-card" />
            <div className="space-y-2 flex flex-col items-center">
              <div className="h-4 bg-gray-400 rounded w-5/6" />
              <div className="h-4 bg-gray-400 rounded w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="flex space-x-4">{cards}</div>;
}

export default PlaceholderSwipper;
