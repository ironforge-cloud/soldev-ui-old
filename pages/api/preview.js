export default async function handler(req, res) {
  res.setPreviewData(
    {},
    {
      maxAge: 60 * 5,
    }
  );
  console.log(req.headers.referer);
  res.redirect(req.headers.referer);
  res.end();
}
