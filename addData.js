$(document).ready(() => {
  // Function to populate the table rows with data
  const populateTable = (data) => {
    const tableBody = $('table tbody');
    tableBody.empty(); // Clear existing rows

    data.forEach((item) => {
      const row = `
        <tr>
          <td>${items.id}</td>
          <td>${items.title}</td>
          <td>${items.description}</td>
          <td>${items.created_at}</td>
          <td>${items.updated_at}</td>
          <td>${categories.id}</td>
          <td>${users.id}</td>
        </tr>
      `;
      tableBody.append(row);
    });
  };
