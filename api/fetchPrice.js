const axios = require("axios");

const GITHUB_TOKEN = "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"; // Replace with your token
const GIST_ID = "dcb17ae937b79386d092cf7f8d6c31b6#file-bitcoin_prices-csv"; // Replace with your Gist ID once you create it

module.exports = async(req, res) => {
    try {
        const response = await axios.get(
            "https://api.cryptowat.ch/markets/kraken/btcusd/price",
        );
        const price = response.data.result.price;
        const time = new Date().toISOString();

        const record = `${time}, ${price}\n`;

        // Fetch the current content of the Gist
        const gistResponse = await axios.get(
            `https://api.github.com/gists/${GIST_ID}`, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            },
        );
        const currentContent =
            gistResponse.data.files["bitcoin_prices.csv"].content;

        // Append the new record
        const updatedContent = currentContent + record;

        // Update the Gist with the new content
        await axios.patch(
            `https://api.github.com/gists/${GIST_ID}`, {
                files: {
                    "bitcoin_prices.csv": {
                        content: updatedContent,
                    },
                },
            }, {
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                },
            },
        );

        res.status(200).send(`Price saved: ${price}`);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Failed to fetch price or update Gist.");
    }
};