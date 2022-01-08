import fetcher from "../../utils/fetcher";

export default async function handler(req, res) {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pinned`
  );

  res.status(200).json(response);
}
