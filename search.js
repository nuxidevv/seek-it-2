// search.js — envoie les recherches à /api/search
// (le proxy dans api/search.js parle à BrixHub, pas le navigateur)

(function () {
  const ENDPOINT = "/api/search";

  async function query(payload) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error("Erreur serveur " + res.status);
    }

    return res.json();
  }

  window.dataClient = { query };
  console.log("Client de recherche prêt");
})();
