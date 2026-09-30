// search.js — Couche de communication (front)
// Nom neutre volontairement : "dataClient"

const dataClient = (() => {
  // Endpoint relatif → invisible dans le code source pour l'API réelle
  const ENDPOINT = '/api/search';

  async function query(payload) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Recherche indisponible (' + res.status + ')');
    return res.json();
  }

  return { query };
})();
