require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const tweetRoutes = require('./routes/tweet');
const rssRoutes = require('./routes/rss');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/tweet', tweetRoutes);
app.use('/api/rss', rssRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'XPublisher @Mastv_hn' }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`XPublisher corriendo en puerto ${PORT}`);
});
