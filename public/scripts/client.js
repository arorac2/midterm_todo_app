$(document).ready(function() {
  console.log("ready");

  const populateTable = function(data) {
    const tableBody = $('tbody');
    tableBody.empty();

    for (const item of data) {
      const row = `
        <tr>
          <td>${textarea1}</td>
          <td>${item.title}</td>
          <td>${item.description}</td>
          <td>${item.created_at}</td>
          <td>${item.updated_at}</td>
          <td>${item.category}</td>
          <td>${item.user}</td>
        </tr>
      `;
      tableBody.append(row);
    }
  };

  const fetchData = function() {
    $.ajax({
      url: '/???', // what url we need to use?
      method: 'GET',
      dataType: 'json',
    })
      .done(function(response) {
        console.log(response);
        populateTable(response);
      })
      .fail(function(error) {
        console.log('Error:', error);
      });
  };

  fetchData();
});
