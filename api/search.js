// api/search.js — proxy qui parle à BrixHub
// Le navigateur appelle /api/search, ce fichier appelle BrixHub

const BRIXHUB_URL = "https://api.brixhub.ru/api/v1/search";

export default async function handler(req, res) {
  // Autorise les requêtes
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Méthode non autorisée" });

  try {
    const reponse = await fetch(BRIXHUB_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {})
    });

    const texte = await reponse.text();
    let data;
    try { data = JSON.parse(texte); } catch { data = { raw: texte }; }

    return res.status(reponse.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Erreur proxy", message: err.message });
  }
}
