/* search.js — Client de recherche
 * Appelle le proxy /api/search (dossier api/search.js côté Vercel).
 * Le proxy fait le POST réel vers BrixHub, donc l'URL externe
 * n'apparaît jamais dans le navigateur.
 */
(function () {
  const ENDPOINT = "/api/search";

  async function query(payload) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${txt.slice(0, 120)}`);
    }

    return res.json();
  }

  window.dataClient = { query };

  console.log("[search] dataClient prêt →", ENDPOINT);
})();
