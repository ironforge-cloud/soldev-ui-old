function CardPlaceholder() {
  const cards = [];
  for (let i = 0; i <= 6; i++) {
    cards.push(
      <div
        className="px-4 block mb-6 mt-2 2xl:mr-5 3xl:m-10 flex-col p-6 border border-dashed border-2 border-blue-300 shadow rounded-md w-[260px] h-[340px]"
        key={i}
      >
        <div className="animate-pulse">
          <div className="mb-5 bg-blue-400 h-5 rounded" />
          <div className="mb-10 bg-blue-400 h-48 rounded" />

          <div className=" bg-blue-400 h-5 rounded w-3/4" />
        </div>
      </div>
    );
  }

  return <>{cards}</>;
}

export default CardPlaceholder;
