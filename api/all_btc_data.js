const { Pool } = require("pg");
const { config } = require("../config");

const pool = new Pool({
  connectionString: config.connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = async (req, res) => {
  try {
    // Fetch all rows from the advancedBTC table
    const query = "SELECT * FROM advancedBTC ORDER BY id DESC LIMIT 10";
    const result = await pool.query(query);

    // Return the data as an array
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
