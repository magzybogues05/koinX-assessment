const {CryptoData} = require('../models/CryptoData');

const storeCryptoData = async (data) => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  for (const coin of coins) {
    const coinData = data[coin];
    const updatedData = {
      coinId: coin,
      name: coin === 'matic-network' ? 'Matic' : coin.charAt(0).toUpperCase() + coin.slice(1),
      symbol: coinData.symbol || coin.toUpperCase(),
      price: coinData.usd,
      marketCap: coinData.usd_market_cap,
      change24h: coinData.usd_24h_change,
    };
    await CryptoData.create(
        updatedData
    );
  }
};

module.exports = { storeCryptoData };
