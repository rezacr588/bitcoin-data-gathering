const axios = require("axios");
const { Pool } = require("pg");
const { config } = require("../config");

const pool = new Pool({
    connectionString: config.connectionString,
});

module.exports = async(req, res) => {
    try {
        const response = await axios.get(
            "https://api.cryptowat.ch/markets/kraken/btcusd/price",
        );
        const price = response.data.result.price;
        const time = new Date().toISOString();

        // Insert the data into the PostgreSQL database
        const query = "INSERT INTO bitcoin_prices(time, price) VALUES($1, $2)";
        await pool.query(query, [time, price]);

        res.status(200).send(`Price saved: ${price}`);
    } catch (error) {
        res.status(500).send(error);
    }
};