// api/search.js — VERSION DIAGNOSTIC
const BRIXHUB_URL = "https://api.brixhub.ru/api/v1/search";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // Diagnostic : on accepte GET pour voir ce qui se passe
  if (req.method === "GET") {
    try {
      const test = await fetch(BRIXHUB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "test" })
      });
      const texte = await test.text();
      return res.status(200).json({
        diagnostic: "Appel BrixHub depuis Vercel",
        status_brixhub: test.status,
        reponse_brixhub: texte.slice(0, 800)
      });
    } catch (e) {
      return res.status(200).json({
        diagnostic: "BrixHub inaccessible",
        erreur: e.message
      });
    }
  }

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
