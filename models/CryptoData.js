const mongoose=require('mongoose');


const cryptoDataSchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now },
});

const CryptoData = mongoose.model('CryptoData', cryptoDataSchema);

module.exports={CryptoData};