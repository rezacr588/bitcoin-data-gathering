const { Pool } = require("pg");
const { config } = require("../config");

// PostgreSQL connection details
const pool = new Pool({
    connectionString: config.connectionString, // Replace with your connection URL
});

module.exports = async(req, res) => {
    try {
        // Fetch the data from the PostgreSQL database
        const query = "SELECT time, price FROM bitcoin_prices ORDER BY time ASC";
        const result = await pool.query(query);

        // Convert the data to CSV format
        const csvHeaders = "TIME,PRICE\n";
        const csvData = result.rows
            .map((row) => `${row.time},${row.price}`)
            .join("\n");
        const fullCsv = csvHeaders + csvData;

        // Set headers for file download
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=bitcoin_prices.csv",
        );

        // Return the CSV data
        res.status(200).send(fullCsv);
    } catch (error) {
        console.error("Error fetching data from PostgreSQL:", error);
        res.status(500).send("Error fetching data from PostgreSQL.");
    }
};