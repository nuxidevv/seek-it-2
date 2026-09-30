/* api/search.js — Proxy serverless Vercel
 * Reçoit POST /api/search du client,
 * fait le POST réel vers BrixHub,
 * renvoie la réponse au client.
 * L'URL BrixHub n'apparaît jamais côté navigateur.
 */

const UPSTREAM = "https://api.brixhub.ru/api/v1/search";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = req.body || {};
    console.log("[proxy] payload reçu :", JSON.stringify(body).slice(0, 300));

    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Si BrixHub demande une clé, ajoute-la en variable d'env Vercel :
        // "Authorization": `Bearer ${process.env.BRIXHUB_KEY}`
      },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    console.log("[proxy] réponse upstream :", upstream.status);
    return res.status(upstream.status).json(data);
  } catch (err) {
    console.error("[proxy] erreur :", err);
    return res.status(500).json({ error: "Upstream error", message: err.message });
  }
}
