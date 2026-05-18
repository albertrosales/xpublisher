const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/fetch', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ ok: false, error: 'Parámetro "url" requerido.' });

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 XPublisher/1.0' },
      timeout: 15000
    });

    if (!response.ok) {
      return res.status(502).json({ ok: false, error: `El feed devolvió HTTP ${response.status}` });
    }

    const text = await response.text();
    res.set('Content-Type', 'application/xml');
    res.send(text);
  } catch (err) {
    console.error('Error leyendo RSS:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;
