import { fetchSpecsModules } from '../../utils/fetch-specs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      res.status(200).json(await fetchSpecsModules());
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Only GET requests allowed!' });
  }
}
