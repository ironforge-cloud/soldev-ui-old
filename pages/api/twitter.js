import fetcher from "../../utils/fetcher";

export default async function handler(req, res) {
  let listID = "";

  if (req.query.list === "developers") {
    listID = "1452853465210933252";
  } else if (req.query.list === "projects") {
    listID = "1476564921030782979";
  }

  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/${listID}`
  );

  res.status(200).json(response);
}
