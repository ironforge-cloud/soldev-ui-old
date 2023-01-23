import { fetchGitHubFile } from '../../utils/fetch-specs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      res.status(200).json(await fetchGitHubFile(req.body.download_url));
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Only POST requests allowed!' });
  }
}
