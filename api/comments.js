module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { creationId } = req.query;
  if (!creationId || !/^[A-Za-z0-9_-]+$/.test(creationId)) {
    return res.status(400).json({ error: 'Invalid creationId' });
  }

  const url = `https://api.nightcafe.studio/v2/comments?discussionItemId=${creationId}&sortBy=created&sortDirection=desc&limit=100`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Origin': 'https://creator.nightcafe.studio',
        'Referer': 'https://creator.nightcafe.studio/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const text = await response.text();
    res.status(response.status).setHeader('Content-Type', 'application/json').send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
