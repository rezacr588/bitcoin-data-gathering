const { Pool } = require("pg");
const { config } = require("../config");

const pool = new Pool({
  connectionString: config.vercel_pg_connection_string,
});

module.exports = async (req, res) => {
  try {
    // Clear data from btc_data table
    const query = `TRUNCATE TABLE btc_data;`;
    await pool.query(query);

    res.status(200).send("Data cleared successfully!");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
