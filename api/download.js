const axios = require("axios");

const GIST_RAW_URL =
    "https://gist.github.com/rezacr588/dcb17ae937b79386d092cf7f8d6c31b6"; // Replace with your Gist's raw URL

module.exports = async(req, res) => {
    try {
        // Fetch the CSV data from the Gist
        const response = await axios.get(GIST_RAW_URL);
        const csvData = response.data;

        // Set headers for file download
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=bitcoin_prices.csv",
        );

        // Return the CSV data
        res.status(200).send(csvData);
    } catch (error) {
        console.error("Error fetching CSV from Gist:", error);
        res.status(500).send("Error fetching CSV from Gist:", error);
    }
};