const { Pool } = require("pg");
const { config } = require("../config");

const pool = new Pool({
  connectionString: config.vercel_pg_connection_string,
});

module.exports = async (req, res) => {
  try {
    // Check if the request method is DELETE
    if (req.method !== "DELETE") {
      return res.status(405).send("Method not allowed"); // 405 Method Not Allowed
    }

    // Clear data from btc_data table
    const query = `TRUNCATE TABLE btc_data;`;
    await pool.query(query);

    res.status(200).send("Data cleared successfully!");
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};
