const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.vercel_pg_connection_string,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = async (req, res) => {
  try {
    // Fetch all rows from the advancedBTC table
    const query = "SELECT * FROM advancedBTC";
    const result = await pool.query(query);

    // Return the data as an array
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
