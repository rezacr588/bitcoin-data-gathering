const { Pool } = require("pg");
const { config } = require("../config");

const pool = new Pool({
    connectionString: config.connectionString,
});

module.exports = async(req, res) => {
    try {
        // Fetch all rows sorted by time in ascending order
        const result = await pool.query(
            "SELECT * FROM bitcoin_prices ORDER BY time ASC",
        );
        const rows = result.rows;

        let rowsToDelete = [];

        // Iterate through the rows and compare timestamps
        for (let i = 0; i < rows.length - 1; i++) {
            const currentTime = rows[i].time;
            const nextTime = rows[i + 1].time;

            // Check if the difference between the two timestamps is not approximately 60,000 milliseconds
            if (Math.abs(nextTime - currentTime) !== 60000) {
                rowsToDelete.push(rows[i].id);
            }
        }

        // Delete the non-conforming rows
        if (rowsToDelete.length > 0) {
            const deleteQuery = "DELETE FROM bitcoin_prices WHERE id = ANY($1)";
            await pool.query(deleteQuery, [rowsToDelete]);
        }

        res.status(200).send(`Cleaned data. Removed ${rowsToDelete.length} rows.`);
    } catch (error) {
        console.error("Error cleaning data:", error);
        res.status(500).send("Error cleaning data.");
    }
};