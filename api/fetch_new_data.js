const axios = require("axios");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://default:HsPubQ4t2vMp@ep-delicate-sun-86744836.us-east-1.postgres.vercel-storage.com:5432/verceldb", // Replace with your Vercel PostgreSQL connection string
});

module.exports = async (req, res) => {
  try {
    const [summaryResponse, orderBookResponse] = await Promise.all([
      axios.get("https://api.cryptowat.ch/markets/binance/btcusdt/summary"),
      axios.get("https://api.cryptowat.ch/markets/binance/btcusdt/orderbook"),
    ]);

    const summaryData = summaryResponse.data.result;
    const orderBookData = orderBookResponse.data.result;

    const lastPrice = summaryData.price.last;
    const volume = summaryData.volume;
    const topBid = orderBookData.bids[0][0];
    const topAsk = orderBookData.asks[0][0];
    const spread = topAsk - topBid;

    // Store data in PostgreSQL
    const query = `
            INSERT INTO btc_data (timestamp, last_price, volume, top_bid, top_ask, spread)
            VALUES (NOW(), $1, $2, $3, $4, $5)
        `;
    await pool.query(query, [lastPrice, volume, topBid, topAsk, spread]);

    res.status(200).send("Data stored successfully!");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
