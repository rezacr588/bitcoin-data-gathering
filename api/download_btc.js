const { Pool } = require("pg");
const { config } = require("../config");

// PostgreSQL connection details
const pool = new Pool({
  connectionString: process.env.vercel_pg_connection_string,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = async (req, res) => {
  try {
    // Fetch the data from the PostgreSQL database
    const query =
      "SELECT time, asks, bids, last_price, volume_24h FROM advancedBTC ORDER BY time ASC";
    const result = await pool.query(query);

    // Convert the data to CSV format
    const csvHeaders = "UNIX_TIMESTAMP,ASKS,BIDS,LAST_PRICE,VOLUME_24H\n";
    const csvData = result.rows
      .map((row) => {
        // Convert ISO 8601 time format to UNIX timestamp
        const unixTime = Math.floor(new Date(row.time).getTime() / 1000);
        return `${unixTime},"${JSON.stringify(row.asks)}","${JSON.stringify(
          row.bids,
        )}",${row.last_price},${row.volume_24h}`;
      })
      .join("\n");
    const fullCsv = csvHeaders + csvData;

    // Set headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=advancedBTC_data.csv",
    );

    // Return the CSV data
    res.status(200).send(fullCsv);
  } catch (error) {
    res.status(500).send(error);
  }
};
