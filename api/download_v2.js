const { Pool } = require("pg");
const { vercelDatabaseConfig } = require("../config");

// PostgreSQL connection details
const pool = new Pool(vercelDatabaseConfig);

module.exports = async (req, res) => {
  try {
    // Fetch the data from the PostgreSQL database
    const query =
      "SELECT timestamp, last_price, volume, top_bid, top_ask, spread FROM btc_data ORDER BY timestamp ASC";
    const result = await pool.query(query);

    // Convert the data to CSV format
    const csvHeaders = "TIMESTAMP,LAST_PRICE,VOLUME,TOP_BID,TOP_ASK,SPREAD\n";
    const csvData = result.rows
      .map((row) => {
        // Convert ISO 8601 time format to UNIX timestamp
        const unixTime = Math.floor(new Date(row.timestamp).getTime() / 1000);
        return `${unixTime},${row.last_price},${row.volume},${row.top_bid},${row.top_ask},${row.spread}`;
      })
      .join("\n");
    const fullCsv = csvHeaders + csvData;

    // Set headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=btc_data.csv");

    // Return the CSV data
    res.status(200).send(fullCsv);
  } catch (error) {
    res.status(500).send(error);
  }
};
