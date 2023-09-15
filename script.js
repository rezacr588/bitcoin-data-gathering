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
                <!-- Add other columns as needed -->
            `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
