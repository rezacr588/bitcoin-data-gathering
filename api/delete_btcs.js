const { Pool } = require("pg");
const { config } = require("../config");

// PostgreSQL connection details
const pool = new Pool({
  connectionString: config.connectionString, // Replace with your connection URL
});

module.exports = async (req, res) => {
  try {
    // Delete all rows from the advancedBTC table
    const query = "DELETE FROM advancedBTC";
    await pool.query(query);

    // Send a success response
    res
      .status(200)
      .send("All rows from advancedBTC table deleted successfully.");
  } catch (error) {
    res.status(500).send(error);
  }
};
