const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { startCryptoFetchJob } = require('./cron/fetchCryptoJob');
const {CryptoData } = require('./models/CryptoData');

const app = express();
app.use(cors());

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process if connection fails
    }
};

connectDB();

//cron job (every 2 hour)
startCryptoFetchJob();

app.get('/stats', async (req, res) => {
    const coin = req.query.coin;

    if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin parameter' });
    }

    try {
        const cryptoData = await CryptoData.findOne({ coinId: coin }).sort({ updatedAt: -1 });

        if (!cryptoData) {
            return res.status(404).json({ error: 'Data not found for the requested coin' });
        }

        res.json({
            price: cryptoData.price,
            marketCap: cryptoData.marketCap,
            "24hChange": cryptoData.change24h,
        });
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/deviation', async (req, res) => {
    const coin = req.query.coin;

    if (!['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
        return res.status(400).json({ error: 'Invalid coin parameter' });
    }

    try {
        const cryptoDataList = await CryptoData.find({ coinId: coin }).sort({ updatedAt: -1 }).limit(100);

        if (cryptoDataList.length === 0) {
            return res.status(404).json({ error: 'Not enough data available for the requested coin' });
        }

        const prices = cryptoDataList.map(data => data.price);

        const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;

        const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;

        const standardDeviation = Math.sqrt(variance).toFixed(2);

        res.json({
            deviation: parseFloat(standardDeviation),
        });
    } catch (error) {
        console.error('Error calculating standard deviation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/',(req,res)=>{
    res.send("Hello! This is backend for KoinX submission. kindly go to /stats or /deviation to query");
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
