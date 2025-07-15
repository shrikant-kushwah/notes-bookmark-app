// ===== backend/utils/fetchMetadata.js =====
const axios = require('axios');
const cheerio = require('cheerio');

const fetchMetadata = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return $('title').text() || 'Untitled';
  } catch (err) {
    return 'Untitled';
  }
};

module.exports = fetchMetadata;