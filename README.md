# Bitcoin Price Data Collection

This repository contains a set of serverless functions designed to fetch the current Bitcoin price from the Cryptowat API, store it in a PostgreSQL database, and provide functionalities to download the data as a CSV file or delete all entries.

## Features

- **Fetch Bitcoin Price**: A serverless function that fetches the current Bitcoin price and stores it in a PostgreSQL database.
- **Download as CSV**: A serverless function that retrieves all Bitcoin price entries from the database and offers them as a downloadable CSV file.
- **Delete All Entries**: A serverless function that deletes all Bitcoin price entries from the database.

## Setup

### 1. Dependencies:

Ensure you have `axios` and `pg` packages installed.

### 2. Database Configuration:

- Sign up on [ElephantSQL](https://www.elephantsql.com/) and set up a PostgreSQL instance.
- Use the provided connection URL to configure the database connection in the serverless functions.

### 3. Deployment:

- Deploy the serverless functions to your preferred platform (e.g., Vercel, Netlify).
- Set up any necessary environment variables or secrets.

## Usage

- **Fetch Bitcoin Price**: Trigger the respective serverless function (e.g., via a scheduled job or manually).
- **Download as CSV**: Access the corresponding function's URL to download the Bitcoin price data as a CSV file.
- **Delete All Entries**: Trigger the delete function to remove all Bitcoin price entries from the database.

## Caution

Be careful when using the delete function as it will permanently remove all data from the database. Ensure you adhere to the rate limits of the Cryptowat API and any other services you use.

## License

This project is open-source and available under the MIT License.
