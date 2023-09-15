const axios = require("axios");
const { Pool } = require("pg");
const { config } = require("../config");

const pool = new Pool({
  connectionString: config.connectionString,
});

module.exports = async (req, res) => {
  try {
    // Fetching the order book
    const orderBookResponse = await axios.get(
      "https://api.binance.com/api/v3/depth?symbol=BTCUSDT&limit=5",
    );

    // Fetching the price and volume
    const priceVolumeResponse = await axios.get(
      "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT",
    );

    const { asks, bids } = orderBookResponse.data;
    const { lastPrice, volume } = priceVolumeResponse.data;

    const time = new Date().toISOString();

    // Insert the data into the PostgreSQL database
    const query = `
            INSERT INTO advancedBTC(time, asks, bids, last_price, volume_24h)
            VALUES($1, $2, $3, $4, $5)
        `;

    await pool.query(query, [
      time,
      JSON.stringify(asks),
      JSON.stringify(bids),
      lastPrice,
      volume,
    ]);

    res.status(200).send(`Bitcoin data saved successfully.`);
  } catch (error) {
    res.status(500).send(error);
  }
};
