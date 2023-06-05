// Client facing scripts here
const loginButton = document.querySelector('.button-container .button');
const modal = document.querySelector('#modal');
const closeButton = document.querySelector('#closeButton');

loginButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

const printResult = function(selector) {
  let text = $(selector).val();
  let count = 140 - text.length;
  $('.counter').text(count);
  $('.counter').toggleClass('negative', count < 0);
};

// Function to populate the table rows with data
const addToTable = (data) => {
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
        <td>${categories.title}</td>
        <td>${users.name}</td>
      </tr>
    `;
    tableBody.append(row);
  });
};

const fetchItems = () => {
  $.ajax({
    url: '/api/items',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      addToTable(response);
    },
    error: function(xhr, status, error) {
      console.error('Error occurred:', error);
    }
  });
};

const aiForm = (formData) => {
  $('#add-result').text(`Loading from AI`);

  const intervalId = setInterval(() => {
    $('#add-result').append('.');
  }, 300);

  const ajaxRequest = $.ajax({
    url: '/api/items',
    type: 'POST',
    data: formData,
  }).done((response) => {
    console.log("response", response);
    const cId = response['categoryId'];
    console.log("cid1: ", cId);
    const item = response.title;

    $.ajax({
      url: `/api/categories/${cId}`,
      type: 'GET',
    }).done((response) => {
      console.log("cId", response.title);
      const category = response.title;
      clearInterval(intervalId);
      $('#add-result').text(`${item} : ${category}`);
    }).fail((xhr, status, error) => {
      console.error("Error occurred in GET /api/categories: ", error);
      clearInterval(intervalId);
      $('#add-result').text('Error occurred');
    });

  }).fail((xhr, status, error) => {
    if (error === 'abort') {
      console.log('Request aborted');
      $('#add-result').text('Request Timed Out. Please try again');
    } else {
      console.error("Error occurred in POST /api/items: ", error);
      clearInterval(intervalId);
      $('#add-result').text('Error occurred');
    }
  });

  // After five seconds, abort the request
  setTimeout(() => {
    ajaxRequest.abort();
  }, 10000);
};

$(document).ready(() => {
  console.log('ready!');

  // Fetch items on page load
  fetchItems();

  $('#item-form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();

    aiForm(formData);
  });

  $('#loginForm').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();
    
   
    performLogin(formData).then(result => {
      const welcomeMessage = $("#welcomeMessage");
      welcomeMessage.text(`Welcome, ${result.user.name}!`);
    });
  });

});



