// search.js — Envoie les recherches au proxy /api/search

(function () {
  const ENDPOINT = "/api/search";

  async function query(payload) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error("HTTP " + res.status + " — " + txt.slice(0, 200));
    }

    return res.json();
  }

  window.dataClient = { query };
  console.log("Client de recherche prêt →", ENDPOINT);
})();
