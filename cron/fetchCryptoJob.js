const cron = require('node-cron');
const { fetchCryptoData } = require('../services/cryptoService');
const { storeCryptoData } = require('../services/storeCryptoData');

const startCryptoFetchJob = () => {
  cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching cryptocurrency data...');
    try {
      const data = await fetchCryptoData();
      await storeCryptoData(data);
      console.log('Cryptocurrency data saved successfully');
    } catch (error) {
      console.error('Failed to fetch and store data:', error);
    }
  });
};

module.exports = { startCryptoFetchJob };
