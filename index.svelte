<script>
  import BTCDataTable from './components/BTCDataTable.svelte'; // Adjust the path if needed

  function navigateTo(endpoint) {
    window.location.href = endpoint;
  }
</script>

<style>
  body {
    font-family: 'Arial', sans-serif;
    text-align: center;
    margin: 0;
    padding: 0;
    background: linear-gradient(45deg, #f3ec78, #af4261);
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  header, footer {
    background-color: #333;
    color: #fff;
    padding: 15px 0;
    font-size: 24px;
  }

  button {
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  h1 {
    color: #fff;
  }

  p {
    color: #fff;
    font-size: 18px;
    margin-bottom: 20px;
  }
</style>

<header>Bitcoin Price Data Collection</header>

<main>
  <h1>Welcome</h1>
  <p>Select an action:</p>
  <button on:click={() => navigateTo('/api/fetch_btc')}>Fetch Bitcoin Data</button>
  <button on:click={() => navigateTo('/api/download_btc')}>Download Bitcoin Data as CSV</button>
  <button on:click={() => navigateTo('/api/delete_btcs')}>Delete All Bitcoin Entries</button>
  <button on:click={() => navigateTo('/api/all_btc_data')}>View All Bitcoin Data</button>

  <!-- Integrate the BTCDataTable component here -->
  <BTCDataTable />
</main>

<footer>Project by Reza Zeraat</footer>
