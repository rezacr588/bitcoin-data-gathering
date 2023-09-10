const axios = require("axios");
const { Pool } = require("pg");
const { vercelDatabaseConfig } = require("../config");

const pool = new Pool(vercelDatabaseConfig);

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
    const insertQuery = `
            INSERT INTO btc_data (timestamp, last_price, volume, top_bid, top_ask, spread)
            VALUES (NOW(), $1, $2, $3, $4, $5)
        `;
    await pool.query(insertQuery, [lastPrice, volume, topBid, topAsk, spread]);

    // Fetch all rows from the database
    const fetchQuery = "SELECT * FROM btc_data";
    const result = await pool.query(fetchQuery);

    // Convert rows to HTML table
    let html = "<table border='1'>";
    html +=
      "<tr><th>Timestamp</th><th>Last Price</th><th>Volume</th><th>Top Bid</th><th>Top Ask</th><th>Spread</th></tr>";
    for (let row of result.rows) {
      html += `<tr>
                <td>${row.timestamp}</td>
                <td>${row.last_price}</td>
                <td>${row.volume}</td>
                <td>${row.top_bid}</td>
                <td>${row.top_ask}</td>
                <td>${row.spread}</td>
               </tr>`;
    }
    html += "</table>";

    res.status(200).send(html);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
