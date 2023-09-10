const { Pool } = require("pg");
const { vercelDatabaseConfig } = require("../config");

const pool = new Pool(vercelDatabaseConfig);

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
