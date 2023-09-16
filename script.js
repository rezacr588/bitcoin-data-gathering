async function fetchData() {
  try {
    const response = await fetch("/api/all_btc_data");
    const data = await response.json();

    const tableBody = document.getElementById("btcDataTable");
    tableBody.innerHTML = ""; // Clear existing rows

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.time}</td>
                <td>${item.price}</td>
                <td>${item.asks}</td>
                <td>${item.bids}</td>
                <td>${item.last_price}</td>
                <td>${item.volume_24h}</td>
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function deleteAllBTCData() {
  try {
    const response = await fetch("/api/delete_btcs", {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
