// api/search.js — Proxy serverless (côté serveur Vercel)
export default async function handler(req, res) {
  // CORS : autorise ton propre domaine
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const upstream = await fetch('https://api.brixhub.ru/api/v1/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Si l'API demande une clé, mets-la dans une variable d'env Vercel :
        // 'Authorization': `Bearer ${process.env.BRIXHUB_KEY}`
      },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Upstream error' });
  }
}
