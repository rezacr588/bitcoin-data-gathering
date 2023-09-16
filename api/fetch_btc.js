const axios = require("axios");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.vercel_pg_connection_string,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = async (req, res) => {
  try {
    // Fetching the order book
    const orderBookResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/tickers",
    );

    // Fetching the price and volume
    const priceVolumeResponse = await axios.get(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1",
    );

    const { tickers } = orderBookResponse.data;
    const { prices } = priceVolumeResponse.data;

    const time = new Date().toISOString();

    // Insert the data into the PostgreSQL database
    const query = `
            INSERT INTO advancedBTC(time, asks, bids, last_price, volume_24h)
            VALUES($1, $2, $3, $4, $5)
        `;

    await pool.query(query, [
      time,
      JSON.stringify(tickers[0].bid_ask_spread_percentage),
      JSON.stringify(tickers[0].bid_ask_spread_percentage),
      prices[prices.length - 1][1],
      tickers[0].volume,
    ]);

    res.status(200).send(`Bitcoin data saved successfully.`);
  } catch (error) {
    res.status(500).send(error);
  }
};
