export default function handler(req, res) {
  res.setPreviewData({});
  res.redirect(req.headers.referer);
}
