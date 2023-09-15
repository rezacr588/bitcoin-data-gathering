<script>
  import { onMount } from 'svelte';

  let btcData = [];

  onMount(async () => {
    try {
      const response = await fetch('/api/all_btc_data');
      btcData = await response.json();
    } catch (error) {
      console.error("Error fetching BTC data:", error);
    }
  });
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #f5f5f5;
  }
</style>

<table>
  <thead>
    <tr>
      <th>Time</th>
      <th>Price</th>
      <th>Volume</th>
      <!-- Add other columns as needed -->
    </tr>
  </thead>
  <tbody>
    {#each btcData as data (data.time)}
      <tr>
        <td>{data.time}</td>
        <td>{data.price}</td>
        <td>{data.volume}</td>
        <!-- Add other data fields as needed -->
      </tr>
    {/each}
  </tbody>
</table>
