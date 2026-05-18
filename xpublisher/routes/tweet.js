const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
const axios = require('axios');
const router = express.Router();

function getClient() {
  const { CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET } = process.env;
  if (!CONSUMER_KEY || !CONSUMER_SECRET || !ACCESS_TOKEN || !ACCESS_TOKEN_SECRET) {
    throw new Error('Credenciales de X API no configuradas en variables de entorno.');
  }
  return new TwitterApi({
    appKey: CONSUMER_KEY,
    appSecret: CONSUMER_SECRET,
    accessToken: ACCESS_TOKEN,
    accessSecret: ACCESS_TOKEN_SECRET,
  });
}

router.post('/publish', async (req, res) => {
  const { text, imageUrl } = req.body;

  if (!text) {
    return res.status(400).json({ ok: false, error: 'El campo "text" es requerido.' });
  }

  try {
    const client = getClient();
    const rwClient = client.readWrite;

    let mediaId = null;

    if (imageUrl) {
      try {
        const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer', timeout: 10000 });
        const contentType = imgRes.headers['content-type'] || 'image/jpeg';
        const buffer = Buffer.from(imgRes.data);
        mediaId = await rwClient.v1.uploadMedia(buffer, { mimeType: contentType });
      } catch (imgErr) {
        console.warn('No se pudo subir la imagen, publicando sin foto:', imgErr.message);
      }
    }

    const tweetPayload = { text };
    if (mediaId) tweetPayload.media = { media_ids: [mediaId] };

    const tweet = await rwClient.v2.tweet(tweetPayload);

    return res.json({
      ok: true,
      tweetId: tweet.data.id,
      url: `https://x.com/Mastv_hn/status/${tweet.data.id}`
    });
  } catch (err) {
    console.error('Error publicando tweet:', err);
    return res.status(500).json({
      ok: false,
      error: err.message || 'Error desconocido al publicar.'
    });
  }
});

module.exports = router;
